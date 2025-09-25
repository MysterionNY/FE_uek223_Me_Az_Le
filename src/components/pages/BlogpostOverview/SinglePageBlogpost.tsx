import * as React from 'react';
import {
  Box, Button, Card, CssBaseline, Grid, Stack, Typography, CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import BlogpostService from '../../../Services/BlogpostService';
import type { Blogpost } from '../../../types/models/Blogpost';

import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import roles from '../../../config/Roles';
import styles from './SinglePageBlogpostStyles';

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${hh}.${dd}.${mm}.${yy}`;
}

export default function SinglePageBlogpost() {
  const { blogpostId } = useParams();
  const navigate = useNavigate();

  const { user, activeUserHasRole } = React.useContext(ActiveUserContext);
  const [post, setPost] = React.useState<Blogpost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!blogpostId) { setError('No blogpost id'); setLoading(false); return; }
    BlogpostService.getBlogpostById(blogpostId)
      .then(setPost)
      .catch((e) => setError(e?.response?.data?.message ?? e.message ?? 'Failed to load'))
      .finally(() => setLoading(false));
  }, [blogpostId]);

  const isAdmin = activeUserHasRole?.(roles.ADMIN) ?? false;
  const isAuthor = Boolean(user && post?.author?.id && user.id === post.author.id);
  const canModify = isAdmin || isAuthor;

  const paragraphs = React.useMemo(() => {
    const full = post?.text ?? '';
    if (!full) return [];
    const parts = full.split(/\r?\n{2,}|\r?\n/).filter(s => s.trim().length > 0);
    let cursor = 0;
    return parts.map(part => {
      const pos = full.indexOf(part, cursor);
      cursor = pos + part.length;
      return { key: `${pos}-${part.length}`, text: part };
    });
  }, [post?.text]);

  const onDelete = async () => {
    if (!post || !blogpostId) return;
    if (!window.confirm('Delete this blogpost?')) return;
    try {
      setDeleting(true);
      await BlogpostService.deleteBlogpost(blogpostId);
      navigate('/blogposts');
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e.message ?? 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Grid>
        <CssBaseline enableColorScheme />
        <Box sx={styles.page}><CircularProgress /></Box>
      </Grid>
    );
  }

  if (error || !post) {
    return (
      <Grid>
        <CssBaseline enableColorScheme />
        <Box sx={styles.page}>
          <Typography color="error">{error ?? 'Not found'}</Typography>
        </Box>
      </Grid>
    );
  }

  const authorName =
    [post.author?.firstName, post.author?.lastName].filter(Boolean).join(' ') || 'Unknown';

  return (
    <Grid>
      <CssBaseline enableColorScheme />
      <Box sx={styles.page}>
        <Stack spacing={1} sx={{ width: { xs: '100%', sm: 620 } }}>
          <Typography
            align="right"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              cursor: post.author?.id ? 'pointer' : 'default',
              '&:hover': { textDecoration: post.author?.id ? 'underline' : 'none' },
            }}
            onClick={() => {
                if (post.author?.id) {
                    navigate(`/blogposts/author/${post.author.id}`);
                }
            }}

          >
            {authorName}
          </Typography>


          <Card sx={styles.card} variant="outlined">
            <Typography variant="h5" sx={styles.title}>
              {post.title}
            </Typography>

            <Typography component="div" sx={styles.text}>
              {paragraphs.map(({ key, text }) => (
                <Typography key={key} paragraph sx={styles.text}>
                  {text}
                </Typography>
              ))}
            </Typography>

            <Box sx={styles.footerRow}>
              <Box />
              <Typography sx={styles.date}>{formatDate(post.createdAt)}</Typography>
            </Box>
          </Card>

          {canModify && (
            <Box sx={styles.actions}>
              <Button
                variant="contained"
                sx={styles.delBtn}
                onClick={onDelete}
                disabled={deleting}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                sx={styles.editBtn}
                onClick={() => navigate(`/blogpost/edit/${post.id}`)}
              >
                Edit
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </Grid>
  );
}
