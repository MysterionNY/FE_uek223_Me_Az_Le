import { SxProps } from '@mui/material';

const signUpContainer: SxProps = {
  position: 'relative',
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  p: { xs: 2, sm: 4 },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  },
};

const registerCard: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: { xs: '100%', sm: 450 },
  m: 'auto',
  p: 4,
  gap: 2,
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
};

export default { signUpContainer, registerCard };
