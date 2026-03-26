import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../api/firebase";

// In-memory cache for instant subsequent loads
let _cache = { blogs: [], timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper for timeout
const withTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('TIMEOUT')), ms)
  );
  return Promise.race([promise, timeout]);
};

export const getBlogs = async (tags, search) => {
  try {
    // Return cached data if fresh (within TTL) and no search/filter active
    const now = Date.now();
    const hasFilters = (tags && tags.length > 0) || (search && search !== "");
    if (!hasFilters && _cache.blogs.length > 0 && (now - _cache.timestamp) < CACHE_TTL) {
      return _cache.blogs;
    }

    // 1. Prepare fetches
    const fetchFirestore = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await withTimeout(getDocs(q), 6000); // 6s timeout (was 10s)
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
        }));
      } catch (err) {
        console.warn("Firestore fetch error or timeout:", err.message);
        return [];
      }
    };

    const fetchDevto = async () => {
      try {
        const response = await withTimeout(
          fetch('https://dev.to/api/articles?per_page=20'),
          5000 // 5s timeout for DEV.to
        );
        if (!response.ok) return [];
        const devtoData = await response.json();
        return devtoData.map(article => ({
          id: article.id.toString(),
          title: article.title,
          content: article.description || "",
          matter: article.description || "",
          category: typeof article.tags === 'string' ? article.tags.split(',')[0] : (article.tag_list?.[0] || "General"),
          image: article.cover_image || article.social_image || "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop",
          author: article.user?.name || "Anonymous",
          authorPic: article.user?.profile_image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
          published_date: article.readable_publish_date,
          reading_time: `${article.reading_time_minutes} min read`,
          tags: article.tag_list || [],
          likes: article.public_reactions_count || 0,
          createdAt: article.published_timestamp
        }));
      } catch (err) {
        console.warn("Dev.to fetch error:", err.message);
        return [];
      }
    };

    // 2. Fetch both in parallel
    const [firestoreBlogs, devtoBlogs] = await Promise.all([
      fetchFirestore(),
      fetchDevto()
    ]);

    // 3. Merge and Filter
    let blogs = [...firestoreBlogs, ...devtoBlogs];

    // Cache unfiltered results
    if (!hasFilters) {
      _cache = { blogs, timestamp: Date.now() };
    }

    if (tags && tags.length > 0) {
      blogs = blogs.filter(blog => tags.some(tag => blog.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())));
    }

    if (search && search !== "") {
      const lowerSearch = search.toLowerCase();
      blogs = blogs.filter(blog =>
        (blog.title && blog.title.toLowerCase().includes(lowerSearch)) ||
        (blog.content && blog.content.toLowerCase().includes(lowerSearch))
      );
    }

    return blogs;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    // Return cached data on error as fallback
    if (_cache.blogs.length > 0) return _cache.blogs;
    return [];
  }
};