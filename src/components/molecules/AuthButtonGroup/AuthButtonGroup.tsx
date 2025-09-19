import React from 'react';
import { Box } from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Explore as ExploreIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../atoms/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../atoms/SecondaryButton/SecondaryButton';
import TextButton from '../../atoms/TextButton/TextButton';

interface AuthButtonGroupProps {
  onLogin?: () => void;
  onRegister?: () => void;
  onBrowse?: () => void;
}

const AuthButtonGroup: React.FC<AuthButtonGroupProps> = ({
  onLogin,
  onRegister,
  onBrowse
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/login');
    }
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      navigate('/register');
    }
  };

  const handleBrowse = () => {
    if (onBrowse) {
      onBrowse();
    } else {
      navigate('/blogposts');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <PrimaryButton
        startIcon={<LoginIcon />}
        onClick={handleLogin}
      >
        Login
      </PrimaryButton>

      <SecondaryButton
        light
        startIcon={<RegisterIcon />}
        onClick={handleRegister}
      >
        Register
      </SecondaryButton>

      <TextButton
        light
        startIcon={<ExploreIcon />}
        onClick={handleBrowse}
      >
        Browse Blogs
      </TextButton>
    </Box>
  );
};

export default AuthButtonGroup;