import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

interface WelcomeSectionProps {
  userName?: string;
  subtitle?: string;
  children?: React.ReactNode;
  statsComponent?: React.ReactNode;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName = 'Writer',
  subtitle = 'Ready to share your next story with the world?',
  children,
  statsComponent
}) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
        color: 'white',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome back, {userName}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              {subtitle}
            </Typography>
            {children}
          </Grid>
          {statsComponent && (
            <Grid item xs={12} md={4}>
              {statsComponent}
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default WelcomeSection;