import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import styles from './IconChipStyles';

interface IconChipProps extends Omit<ChipProps, 'sx'> {
  gradient?: boolean;
}

const IconChip: React.FC<IconChipProps> = ({ gradient = false, ...props }) => {
  const sx = gradient ? styles.gradientChip : styles.defaultChip;

  return <Chip sx={sx} {...props} />;
};

export default IconChip;