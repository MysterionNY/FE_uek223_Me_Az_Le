import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {
  gradient?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  gradient = false,
  sx = {},
  ...props
}) => {
  const baseStyles = gradient ? {
    background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
    color: 'white',
    fontWeight: 'bold',
    px: 4,
    py: 1.5,
    '&:hover': {
      background: 'linear-gradient(135deg, #0a0aaf, #00b4dd)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
    },
    ...sx
  } : {
    bgcolor: 'white',
    color: '#0f0fcf',
    fontWeight: 'bold',
    px: 4,
    py: 1.5,
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.9)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
    },
    ...sx
  };

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