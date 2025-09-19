import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatCardProps {
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;