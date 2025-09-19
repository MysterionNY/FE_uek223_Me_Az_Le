import React from 'react';
import { Box } from '@mui/material';
import {
  Logout as LogoutIcon
} from '@mui/icons-material';
import SecondaryButton from '../../atoms/SecondaryButton/SecondaryButton';

interface UserActionButtonsProps {
  onLogout?: () => void;
}

const UserActionButtons: React.FC<UserActionButtonsProps> = ({
  onLogout
}) => {

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {onLogout && (
        <SecondaryButton
          light
          startIcon={<LogoutIcon />}
          onClick={onLogout}
        >
          Logout
        </SecondaryButton>
      )}
    </Box>
  );
};

export default UserActionButtons;