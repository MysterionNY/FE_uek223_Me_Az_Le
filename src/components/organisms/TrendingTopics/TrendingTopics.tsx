import React from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';

export interface TrendingTopic {
  name: string;
  posts: number;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
  title?: string;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  topics,
  title = 'Trending Topics'
}) => {

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingIcon sx={{ mr: 1, color: '#00d4ff' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {topics.map((topic, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.02)'
            }
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              #{topic.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {topic.posts} posts
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.5 }}>
            {index + 1}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default TrendingTopics;