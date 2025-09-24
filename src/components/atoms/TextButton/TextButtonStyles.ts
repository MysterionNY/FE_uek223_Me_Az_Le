import { SxProps } from "@mui/material";

const lightTextButton: SxProps = {
  color: 'white',
  fontWeight: 'bold',
  px: 4,
  py: 1.5,
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-2px)'
  }
};

const darkTextButton: SxProps = {
  color: '#0f0fcf',
  fontWeight: 'bold',
  px: 4,
  py: 1.5,
  '&:hover': {
    bgcolor: 'rgba(15,15,207,0.05)',
    transform: 'translateY(-2px)'
  }
};

export default { lightTextButton, darkTextButton };