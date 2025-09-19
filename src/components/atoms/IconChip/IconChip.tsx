import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface IconChipProps extends Omit<ChipProps, 'sx'> {
  gradient?: boolean;
}

const IconChip: React.FC<IconChipProps> = ({ gradient = false, ...props }) => {
  const sx = gradient
    ? {
        background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        py: 2.5,
        px: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }
    : {
        bgcolor: 'rgba(255,255,255,0.2)',
        color: 'white',
        fontSize: '1rem',
        py: 2.5
      };

  return <Chip sx={sx} {...props} />;
};

export default IconChip;