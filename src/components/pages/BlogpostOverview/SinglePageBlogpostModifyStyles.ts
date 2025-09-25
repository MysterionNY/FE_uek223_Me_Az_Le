import { SxProps, Theme } from '@mui/material';

type StyleKeys = 'container' | 'card' | 'title' | 'footer' | 'cancel' | 'save';

const styles: Record<StyleKeys, SxProps<Theme>> = {
  container: {
    position: 'relative',
    minHeight: '100dvh',
    p: { xs: 2, sm: 4 },
    display: 'grid',
    placeItems: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210,100%,97%), #fff)',
    },
    backgroundImage: 'radial-gradient(#cbd5ff 1px, transparent 1px)',
    backgroundSize: '14px 14px',
  },
  card: {
    width: { xs: '100%', sm: 520 },
    p: 3,
    borderRadius: 4,
    backgroundColor: '#a9b6ff33',
    boxShadow:
      'hsla(220,30%,5%,.05) 0 5px 15px, hsla(220,25%,10%,.05) 0 15px 35px -5px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
  },
  title: { fontSize: 'clamp(1.4rem,2.5vw,1.6rem)', fontWeight: 700 },
  footer: { display: 'flex', justifyContent: 'center', gap: 2, mt: 1 },
  cancel: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    px: 4,
    borderRadius: 3,
    '&:hover': { backgroundColor: '#ff5252' },
  },
  save: {
    backgroundColor: '#58c16b',
    color: '#fff',
    px: 4,
    borderRadius: 3,
    '&:hover': { backgroundColor: '#44b35a' },
  },
};

export default styles;
