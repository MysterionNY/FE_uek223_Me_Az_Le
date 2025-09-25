import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Box, Chip, CircularProgress, Alert,
  Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Avatar, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Pagination
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import BlogpostService from '../../../Services/BlogpostService';
import { Blogpost, BlogpostCategory } from '../../../types/models/Blogpost';
import roles from '../../../config/Roles';
import DeleteButton from '../../atoms/DeleteButton/DeleteButton';
import UpdateButton from '../../atoms/UpdateButton/UpdateButton';

const POSTS_PER_PAGE = 9;

const BlogpostOverview: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { activeUserHasRole } = useContext(ActiveUserContext);

  const categoryFromUrl = searchParams.get('category') ?? 'ALL';
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);

  const [pagePosts, setPagePosts] = useState<Blogpost[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

  const loadPage = async (pageIdx: number, category: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await BlogpostService.getAllBlogpostsPaginated(pageIdx, POSTS_PER_PAGE, category);
      setPagePosts(data);

      if (data.length < POSTS_PER_PAGE) {
        setHasNextPage(false);
      } else {
        const next = await BlogpostService.getAllBlogpostsPaginated(pageIdx + 1, POSTS_PER_PAGE, category);
        setHasNextPage(next.length > 0);
      }
    } catch (err: any) {
      console.error('Error fetching blogposts:', err);
      setError(err?.response?.data?.message ?? 'Failed to load blogposts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(currentPage - 1, selectedCategory);
  }, [selectedCategory, currentPage]);

  const visiblePosts = useMemo(() => {
    if (!searchTerm) return pagePosts;
    const q = searchTerm.toLowerCase();
    return pagePosts.filter(post =>
        post.title?.toLowerCase().includes(q) ||
        post.text?.toLowerCase().includes(q) ||
        `${post.author?.firstName ?? ''} ${post.author?.lastName ?? ''}`.toLowerCase().includes(q)
    );
  }, [pagePosts, searchTerm]);

  // Pagination-Count ohne totalPages: wir zeigen die aktuelle Seite + evtl. eine nächste Seite an
  const approxTotalPages = currentPage + (hasNextPage ? 1 : 0);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => setSearchTerm('');

  const handleCardClick = (blogpostId: string) => navigate(`/blogpost/${blogpostId}`);
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
    if (!postToDelete) return;
    try {
      await BlogpostService.deleteBlogpost(postToDelete);
      setDeleteDialogOpen(false);
      setPostToDelete(null);

      // If page is empty, jump one back
      const stayOn = pagePosts.length > 1 ? currentPage : Math.max(1, currentPage - 1);
      setCurrentPage(stayOn); // triggert loadPage via useEffect
    } catch (err: any) {
      console.error('Error deleting blogpost:', err);
      alert(err?.response?.data?.message ?? 'Failed to delete blogpost');
    }
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const getExcerpt = (text: string) => {
    if (!text) return '';
    const maxLength = 300;
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  const formatCategory = (category: string) =>
      category ? category.charAt(0) + category.slice(1).toLowerCase() : 'OTHER';

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
          <Button onClick={() => loadPage(currentPage - 1, selectedCategory)} sx={{ mt: 2 }}>
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

        {/* Filter */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Suche */}
            <Grid item xs={12} md={6}>
              <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search by title, content, or author..."
                  value={searchTerm}
                  id="search-bar"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={handleClearSearch}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                    )
                  }}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                >
                  <MenuItem value="ALL">All Categories</MenuItem>
                  {Object.values(BlogpostCategory).map((category) => (
                      <MenuItem key={category} value={category}>
                        {formatCategory(category)}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Count (current page) */}
            <Grid item xs={12} md={2}>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                {visiblePosts.length} {visiblePosts.length === 1 ? 'post' : 'posts'} on this page
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {visiblePosts.length === 0 ? (
            <Alert severity="info">
              {searchTerm || selectedCategory !== 'ALL'
                  ? 'No blogposts found matching your filters.'
                  : 'No blogposts available yet.'}
            </Alert>
        ) : (
            <>
              <Grid container spacing={3} justifyContent="center">
                {visiblePosts.map((post) => (
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
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }
                          }}
                      >
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                                sx={{ background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)', color: 'white', fontWeight: 'bold' }}
                            />
                          </Box>

                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                            {post.title || 'Untitled'}
                          </Typography>

                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                            {getExcerpt(post.text)}
                          </Typography>

                          <Box sx={{ mt: 'auto', mb: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recently'}
                            </Typography>
                          </Box>

                          {activeUserHasRole(roles.ADMIN) && (
                              <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
                                <UpdateButton onClick={(e) => handleEdit(e, post.id)} size="small" />
                                <DeleteButton onClick={(e) => handleDeleteClick(e, post.id)} size="small" />
                              </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={Math.max(approxTotalPages, 1)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                />
              </Box>
            </>
        )}

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
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