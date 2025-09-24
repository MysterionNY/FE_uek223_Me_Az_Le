import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  date: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/blogpost/${post.id}`);
      }}
      sx={{
        mb: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#0f0fcf', mr: 2 }}>
            {post.author[0]}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {post.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.date} · {post.readTime} read
            </Typography>
          </Box>
          <Chip
            label={post.category}
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
              color: 'white'
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: 'bold' }}
        >
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.excerpt}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default PostCard;