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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import BlogpostService from '../../../Services/BlogpostService';
import { Blogpost } from '../../../types/models/Blogpost';
import roles from '../../../config/Roles';
import DeleteButton from '../../atoms/DeleteButton/DeleteButton';
import UpdateButton from '../../atoms/UpdateButton/UpdateButton';

const BlogpostOverview: React.FC = () => {
  const navigate = useNavigate();
  const { activeUserHasRole } = useContext(ActiveUserContext);
  const [blogposts, setBlogposts] = useState<Blogpost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);


  useEffect(() => {
    fetchBlogposts();
  }, []);

  const fetchBlogposts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BlogpostService.getAllBlogposts();
      // Sort by most recent first
      const sortedData = data.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setBlogposts(sortedData);
    } catch (err: any) {
      console.error('Error fetching blogposts:', err);
      setError(err.response?.data?.message || 'Failed to load blogposts');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (blogpostId: string) => {
    navigate(`/blogpost/${blogpostId}`);
  };

  const handleEdit = (e: React.MouseEvent, blogpostId: string) => {
    e.stopPropagation();
    navigate(`/blogpost/edit/${blogpostId}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, blogpostId: string) => {
    e.stopPropagation();
    setPostToDelete(blogpostId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await BlogpostService.deleteBlogpost(postToDelete);
        await fetchBlogposts(); // Refresh the list
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      } catch (err: any) {
        console.error('Error deleting blogpost:', err);
        alert(err.response?.data?.message || 'Failed to delete blogpost');
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const getExcerpt = (text: string) => {
    if (!text) return '';
    const maxLength = 300; // Increased for better preview
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatCategory = (category: string) => {
    if (!category) return 'OTHER';
    return category.charAt(0) + category.slice(1).toLowerCase();
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
        <Button onClick={fetchBlogposts} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        All Blogposts
      </Typography>

      {blogposts.length === 0 ? (
        <Alert severity="info">No blogposts available yet.</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
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
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

                  {/* Author and Category */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#0f0fcf', width: 32, height: 32, mr: 1 }}>
                      {post.author?.firstName?.[0] || 'A'}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {`${post.author?.firstName || ''} ${post.author?.lastName || ''}`.trim() || 'Anonymous'}
                      </Typography>
                    </Box>
                    <Chip
                      label={formatCategory(post.category)}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {post.title || 'Untitled'}
                  </Typography>

                  {/* Excerpt */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {getExcerpt(post.text)}
                  </Typography>

                  {/* Date - positioned at bottom */}
                  <Box sx={{ mt: 'auto', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recently'}
                    </Typography>
                  </Box>

                  {/* Admin Actions */}
                  {activeUserHasRole(roles.ADMIN) && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
                      <UpdateButton
                        onClick={(e) => handleEdit(e, post.id)}
                        size="small"
                      />
                      <DeleteButton
                        onClick={(e) => handleDeleteClick(e, post.id)}
                        size="small"
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blogpost? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogpostOverview;