import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface TextButtonProps extends ButtonProps {
  light?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  light = false,
  sx = {},
  ...props
}) => {
  const baseStyles = light ? {
    color: 'white',
    fontWeight: 'bold',
    px: 4,
    py: 1.5,
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.1)',
      transform: 'translateY(-2px)'
    },
    ...sx
  } : {
    color: '#0f0fcf',
    fontWeight: 'bold',
    px: 4,
    py: 1.5,
    '&:hover': {
      bgcolor: 'rgba(15,15,207,0.05)',
      transform: 'translateY(-2px)'
    },
    ...sx
  };

  return (
    <Button
      variant="text"
      size="large"
      sx={baseStyles}
      {...props}
    >
      {children}
    </Button>
  );
};

export default TextButton;