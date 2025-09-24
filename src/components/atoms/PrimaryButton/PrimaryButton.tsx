import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import styles from './PrimaryButtonStyles';

interface PrimaryButtonProps extends ButtonProps {
  gradient?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  gradient = false,
  sx = {},
  ...props
}) => {
  const baseStyles = gradient ?
    { ...styles.gradientButton, ...sx } :
    { ...styles.defaultButton, ...sx };

  return (
    <Button
      variant="contained"
      size="large"
      sx={baseStyles}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;