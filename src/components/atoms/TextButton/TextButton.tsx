import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import styles from './TextButtonStyles';

interface TextButtonProps extends ButtonProps {
  light?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  light = false,
  sx = {},
  ...props
}) => {
  const baseStyles = light ?
    { ...styles.lightTextButton, ...sx } :
    { ...styles.darkTextButton, ...sx };

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