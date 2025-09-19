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
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  readTime: string;
  date: string;
}

interface PostCardProps {
  post: Post;
  onLike?: (id: number) => void;
  onComment?: (id: number) => void;
  onShare?: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        mb: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          cursor: 'pointer'
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
          onClick={() => navigate(`/blogpost/${post.id}`)}
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