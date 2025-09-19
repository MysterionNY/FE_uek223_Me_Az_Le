import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface SecondaryButtonProps extends ButtonProps {
  light?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  light = false,
  sx = {},
  ...props
}) => {
  const baseStyles = light ? {
    borderColor: 'white',
    color: 'white',
    fontWeight: 'bold',
    px: 4,
    py: 1.5,
    borderWidth: 2,
    '&:hover': {
      borderColor: 'white',
      borderWidth: 2,
      bgcolor: 'rgba(255,255,255,0.1)',
      transform: 'translateY(-2px)'
    },
    ...sx
  } : {
    borderColor: '#0f0fcf',
    color: '#0f0fcf',
    fontWeight: 'bold',
    px: 4,
    py: 1.5,
    borderWidth: 2,
    '&:hover': {
      borderColor: '#0f0fcf',
      borderWidth: 2,
      bgcolor: 'rgba(15,15,207,0.05)',
      transform: 'translateY(-2px)'
    },
    ...sx
  };

  return (
    <Button
      variant="outlined"
      size="large"
      sx={baseStyles}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;