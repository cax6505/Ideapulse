const getBlog = async (id) => {
    try {
        const response = await fetch(`https://dev.to/api/articles/${id}`);
        if (!response.ok) throw new Error('API Error');
        const article = await response.json();

        return {
            id: article.id,
            title: article.title,
            content: article.body_html || article.description,
            matter: article.body_markdown || article.description,
            category: typeof article.tags === 'string' ? article.tags.split(',')[0] : (article.tag_list?.[0] || "General"),
            image: article.cover_image || article.social_image || "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop",
            author: article.user?.name || "Anonymous",
            authorPic: article.user?.profile_image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
            published_date: article.readable_publish_date,
            reading_time: `${article.reading_time_minutes} min read`,
            tags: article.tag_list || [],
            likes: article.public_reactions_count || 0,
            createdAt: article.published_timestamp
        };
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default getBlog;