import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { UpdateButtonStyles } from './UpdateButtonStyles';

interface UpdateButtonProps extends Omit<IconButtonProps, 'children'> {
  ariaLabel?: string;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({
  ariaLabel = "update",
  sx,
  ...props
}) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      sx={{ ...UpdateButtonStyles.button, ...sx }}
      {...props}
    >
      <EditIcon />
    </IconButton>
  );
};

export default UpdateButton;