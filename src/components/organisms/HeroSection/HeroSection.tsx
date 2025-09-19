import React from 'react';
import { Box, Container, Typography, Grid, Chip } from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  AutoAwesome as SparkleIcon
} from '@mui/icons-material';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  logoSrc: string;
  children?: React.ReactNode;
  stats?: Array<{
    icon: React.ReactNode;
    label: string;
  }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  logoSrc,
  children,
  stats
}) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
        color: '#fff',
        pt: 8,
        pb: 12,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.95,
                lineHeight: 1.6
              }}
            >
              {subtitle}
            </Typography>

            {stats && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                {stats.map((stat, index) => (
                  <Chip
                    key={index}
                    icon={<>{stat.icon}</>}
                    label={stat.label}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '1rem',
                      py: 2.5
                    }}
                  />
                ))}
              </Box>
            )}

            {children}
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={logoSrc}
              alt="OurSpace Logo"
              sx={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' }
                }
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;