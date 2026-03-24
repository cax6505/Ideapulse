export const getRelatedBlogs = async ({ tags, id }) => {
    try {
        let url = 'https://dev.to/api/articles?per_page=6';
        if (tags && tags.length > 0) {
            url += `&tag=${tags[0]}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();

        const blogs = data.map(article => ({
            id: article.id,
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

        return blogs.filter(b => String(b.id) !== String(id)).slice(0, 5);
    } catch (err) {
        console.error(err);
        return [];
    }
}; 
