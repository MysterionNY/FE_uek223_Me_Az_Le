import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Grid, Box, Button, Alert, CircularProgress } from '@mui/material';
import { AutoAwesome as SparkleIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import BlogpostService from '../../../Services/BlogpostService';
import SecondaryButton from '../../atoms/SecondaryButton/SecondaryButton';
import OutlinedButton from '../../atoms/OutlinedButton/OutlinedButton';
import UserActionButtons from '../../molecules/UserActionButtons/UserActionButtons';
import PostCard, { Post } from '../../molecules/PostCard/PostCard';
import WelcomeSection from '../../organisms/WelcomeSection/WelcomeSection';
import TrendingTopics from '../../organisms/TrendingTopics/TrendingTopics';

import { Blogpost } from '../../../types/models/Blogpost';

export default function LoggedInHomePage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(ActiveUserContext);

  const [blogposts, setBlogposts] = useState<Blogpost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch blogposts
      const blogpostsData = await BlogpostService.getAllBlogposts();
      // Sort by most recent first (assuming createdAt exists)
      const sortedBlogposts = blogpostsData.sort((a: Blogpost, b: Blogpost) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Most recent first
      });
      setBlogposts(sortedBlogposts);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.message ?? 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const convertBlogpostToPost = (blogpost: Blogpost): Post => {
    const text = blogpost.text || '';
    const excerpt = text.length > 150 ? text.substring(0, 150) + '...' : text;

    return {
      id: blogpost.id,
      title: blogpost.title || 'Untitled',
      excerpt: excerpt,
      author: `${blogpost.author?.firstName || ''} ${blogpost.author?.lastName || ''}`.trim() || 'Anonymous',
      category: blogpost.category || 'OTHER',
      readTime: '',
      date: blogpost.createdAt ? new Date(blogpost.createdAt).toLocaleDateString() : 'Recently'
    };
  };

  const getTrendingTopics = () => {
    const categoryCount: { [key: string]: number } = {};
    blogposts.forEach(post => {
      if (post.category) {
        categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
      }
    });

    return Object.entries(categoryCount)
      .map(([name, posts]) => ({ name, posts }))
      .sort((a, b) => b.posts - a.posts)
      .slice(0, 5);
  };

  const handleTopicClick = (topicName: string) => {
    navigate(`/blogposts?category=${topicName}`);
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
        <Button onClick={fetchData} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );
  }

  const recentPosts = blogposts
    .slice(0, 3)
    .map(convertBlogpostToPost);


  return (
    <>
      <WelcomeSection
        userName={user?.firstName}
      >
        <UserActionButtons
            onLogout={() => {
              logout();
              navigate("/");
            }}
        />

      </WelcomeSection>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Recent Posts Feed */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SparkleIcon sx={{ mr: 1, color: '#0f0fcf' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Recent Posts
              </Typography>
            </Box>

            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))
            ) : (
              <Alert severity="info">
                No posts yet. Be the first to create a post!
              </Alert>
            )}

            {blogposts.length > 3 && (
              <OutlinedButton
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/blogposts')}
              >
                View All Posts
              </OutlinedButton>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Trending Topics */}
            {getTrendingTopics().length > 0 && (
              <TrendingTopics
                topics={getTrendingTopics()}
                onTopicClick={handleTopicClick}
              />
            )}

            {/* Quick Actions */}
            <Box sx={{ mt: 3 }}>
              <SecondaryButton
                fullWidth
                startIcon={<EditIcon />}
                onClick={() => navigate('/blogpost/create')}
              >
                Create New Post
              </SecondaryButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}