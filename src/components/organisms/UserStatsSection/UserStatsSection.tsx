import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import StatCard from '../../atoms/StatCard/StatCard';

export interface UserStats {
  posts: number;
  views: number | string;
  followers: number;
  following: number;
}

interface UserStatsSectionProps {
  stats: UserStats;
  title?: string;
}

const UserStatsSection: React.FC<UserStatsSectionProps> = ({
  stats,
  title = 'Your Stats'
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StatCard value={stats.posts} label="Posts Published" />
        </Grid>
        <Grid item xs={6}>
          <StatCard value={stats.views} label="Total Views" />
        </Grid>
        <Grid item xs={6}>
          <StatCard value={stats.followers} label="Followers" />
        </Grid>
        <Grid item xs={6}>
          <StatCard value={stats.following} label="Following" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserStatsSection;