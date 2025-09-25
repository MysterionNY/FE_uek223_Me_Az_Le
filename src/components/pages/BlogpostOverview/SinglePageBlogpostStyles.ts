import { SxProps, Theme } from '@mui/material';

type Keys =
  | 'page' | 'card' | 'label' | 'title' | 'text'
  | 'footerRow' | 'date' | 'actions' | 'delBtn' | 'editBtn';

const styles: Record<Keys, SxProps<Theme>> = {
  page: {
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
    width: { xs: '100%', sm: 620 },
    p: { xs: 2.5, sm: 3 },
    borderRadius: 4,
    backgroundColor: '#a9b6ff33',
    boxShadow:
      'hsla(220,30%,5%,.05) 0 5px 15px, hsla(220,25%,10%,.05) 0 15px 35px -5px',
  },
  label: { fontWeight: 800, letterSpacing: 1, color: '#2f2f93' },
  title: {
    textTransform: 'uppercase',
    fontWeight: 800,
    letterSpacing: '2px',
    mb: 1.5,
    color: '#2f2f93',
  },
  text: { color: '#1a1a1a', lineHeight: 1.7 },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    mt: 2,
  },
  date: { fontSize: '0.8rem', opacity: 0.7 },
  actions: { display: 'flex', justifyContent: 'center', gap: 2, mt: 2.5 },
  delBtn: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    px: 4,
    borderRadius: 3,
    '&:hover': { backgroundColor: '#ff5252' },
  },
  editBtn: {
    backgroundColor: '#4b59e7',
    color: '#fff',
    px: 4,
    borderRadius: 3,
    '&:hover': { backgroundColor: '#3f4acc' },
  },
};

export default styles;
