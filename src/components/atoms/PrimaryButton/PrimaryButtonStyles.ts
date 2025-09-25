import { SxProps } from "@mui/material";

const gradientButton: SxProps = {
  background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
  color: 'white',
  fontWeight: 'bold',
  px: 4,
  py: 1.5,
  '&:hover': {
    background: 'linear-gradient(135deg, #0a0aaf, #00b4dd)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
  }
};

const defaultButton: SxProps = {
  bgcolor: 'white',
  color: '#0f0fcf',
  fontWeight: 'bold',
  px: 4,
  py: 1.5,
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
  }
};

export default { gradientButton, defaultButton };