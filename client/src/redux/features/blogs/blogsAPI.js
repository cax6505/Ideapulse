export const getBlogs = async (tags, search) => {
  try {
    const response = await fetch('https://dev.to/api/articles?per_page=30');
    if (!response.ok) throw new Error('API Error');
    let data = await response.json();

    let blogs = data.map(article => ({
      id: article.id,
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
    console.error(err);
    return [];
  }
};