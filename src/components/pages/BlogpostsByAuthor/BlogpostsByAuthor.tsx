import React, { useContext, useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    CircularProgress,
    Alert,
    Avatar
} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import BlogpostService from '../../../Services/BlogpostService';
import { Blogpost } from '../../../types/models/Blogpost';


const BlogpostsByAuthor: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const navigate = useNavigate();

    const [blogposts, setBlogposts] = useState<Blogpost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authorId) {
            fetchBlogpostsByAuthor(authorId);
        }
    }, [authorId]);

    const fetchBlogpostsByAuthor = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await BlogpostService.getBlogpostsByAuthor(id);
            const sortedData = data.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
            setBlogposts(sortedData);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to load blogposts');
        } finally {
            setLoading(false);
        }
    };

    const getExcerpt = (text: string) => {
        const maxLength = 300;
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const formatCategory = (category: string) => {
        return category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : 'OTHER';
    };

    const handleCardClick = (blogpostId: string) => {
        navigate(`/blogpost/${blogpostId}`);
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
                Blogposts by Author
            </Typography>

            {blogposts.length === 0 ? (
                <Alert severity="info">This author has not published any blogposts yet.</Alert>
            ) : (
                <Grid container spacing={3}>
                    {blogposts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Card
                                onClick={() => handleCardClick(post.id)}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    {/* Author info */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: '#0f0fcf', width: 32, height: 32, mr: 1 }}>
                                            {post.author?.firstName?.[0] || 'A'}
                                        </Avatar>
                                        <Typography variant="body2" color="text.secondary">
                                            {`${post.author?.firstName || ''} ${post.author?.lastName || ''}`.trim() || 'Anonymous'}
                                        </Typography>
                                        <Chip
                                            label={formatCategory(post.category)}
                                            size="small"
                                            sx={{
                                                background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                marginLeft: 'auto'
                                            }}
                                        />
                                    </Box>

                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{post.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {getExcerpt(post.text)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default BlogpostsByAuthor;