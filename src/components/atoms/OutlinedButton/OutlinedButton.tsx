import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { OutlinedButtonStyles } from './OutlinedButtonStyles';

interface OutlinedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      sx={{ ...OutlinedButtonStyles.button, ...sx }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;