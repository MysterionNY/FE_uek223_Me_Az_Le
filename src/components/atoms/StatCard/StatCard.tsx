import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './StatCardStyles';

interface StatCardProps {
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <Box>
      <Typography variant="h4" sx={styles.valueText}>
        {value}
      </Typography>
      <Typography variant="body2" sx={styles.labelText}>
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;