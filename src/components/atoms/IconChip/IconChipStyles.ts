import { SxProps } from "@mui/material";

const gradientChip: SxProps = {
  background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  py: 2.5,
  px: 2,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)'
  }
};

const defaultChip: SxProps = {
  bgcolor: 'rgba(255,255,255,0.2)',
  color: 'white',
  fontSize: '1rem',
  py: 2.5
};

export default { gradientChip, defaultChip };