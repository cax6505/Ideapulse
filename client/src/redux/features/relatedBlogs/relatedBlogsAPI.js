import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../../api/firebase";

export const getRelatedBlogs = async ({ tags, id }) => {
    try {
        // 1. Fetch from Firestore by tags
        let firestoreBlogs = [];
        if (tags && tags.length > 0) {
            const q = query(
                collection(db, "blogs"), 
                where("category", "in", tags.slice(0, 10)), // Firestore 'in' limit is 10
                limit(6)
            );
            const querySnapshot = await getDocs(q);
            firestoreBlogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
            }));
        }

        // 2. Fetch from Dev.to API
        let url = 'https://dev.to/api/articles?per_page=6';
        if (tags && tags.length > 0) {
            url += `&tag=${tags[0]}`;
        }
        
        const response = await fetch(url);
        let devtoData = [];
        if (response.ok) {
            devtoData = await response.json();
        }

        const devtoBlogs = devtoData.map(article => ({
            id: article.id.toString(),
            title: article.title,
            content: article.description || "",
            image: article.cover_image || article.social_image || "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop",
            author: article.user?.name || "Anonymous",
            authorPic: article.user?.profile_image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            published_date: article.readable_publish_date,
            reading_time: `${article.reading_time_minutes} min read`,
            tags: article.tag_list || [],
            likes: article.public_reactions_count || 0,
            createdAt: article.published_timestamp
        }));

        // 3. Merge and Filter
        const mergedBlogs = [...firestoreBlogs, ...devtoBlogs];
        return mergedBlogs
            .filter(b => String(b.id) !== String(id))
            .slice(0, 3); // Return top 3 related
    } catch (err) {
        console.error("Error fetching related blogs:", err);
        return [];
    }
}; 
