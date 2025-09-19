import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import { PersonAdd as FollowIcon } from '@mui/icons-material';

export interface Author {
  id: string;
  name: string;
  followers: number;
  avatar?: string;
}

interface SuggestedAuthorsProps {
  authors: Author[];
  title?: string;
  onFollow?: (authorId: string) => void;
}

const SuggestedAuthors: React.FC<SuggestedAuthorsProps> = ({
  authors,
  title = 'Suggested Authors',
  onFollow
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {authors.map((author) => (
        <Box
          key={author.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 32, height: 32, mr: 2, bgcolor: '#0f0fcf' }}
              src={author.avatar}
            >
              {!author.avatar && author.name[0]}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {author.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {author.followers} followers
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            sx={{ color: '#0f0fcf' }}
            onClick={() => onFollow?.(author.id)}
          >
            <FollowIcon />
          </IconButton>
        </Box>
      ))}
    </Paper>
  );
};

export default SuggestedAuthors;