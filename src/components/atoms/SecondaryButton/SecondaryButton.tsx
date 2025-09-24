import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import styles from './SecondaryButtonStyles';

interface SecondaryButtonProps extends ButtonProps {
  light?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  light = false,
  sx = {},
  ...props
}) => {
  const baseStyles = light ?
    { ...styles.lightButton, ...sx } :
    { ...styles.darkButton, ...sx };

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