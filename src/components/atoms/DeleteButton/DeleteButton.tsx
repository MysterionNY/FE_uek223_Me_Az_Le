import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DeleteButtonStyles } from './DeleteButtonStyles';

interface DeleteButtonProps extends Omit<IconButtonProps, 'children'> {
  ariaLabel?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  ariaLabel = "delete",
  sx,
  ...props
}) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      sx={{ ...DeleteButtonStyles.button, ...sx }}
      {...props}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButton;