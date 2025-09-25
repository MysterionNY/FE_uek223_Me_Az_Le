import { Box, Container, Typography, Grid, Paper, Chip } from '@mui/material';
import {
  Create as CreateIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  AutoAwesome as SparkleIcon,
  FormatQuote as QuoteIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import logo from '../../../logo1.png';
import HeroSection from '../../organisms/HeroSection/HeroSection';
import AuthButtonGroup from '../../molecules/AuthButtonGroup/AuthButtonGroup';
import { BlogpostCategory } from '../../../types/models/Blogpost';
import Navbar from "../../organisms/Navbar/Navbar";

export default function HomePage() {
    return (
      <>
        {/* NAVBAR PLACEHOLDER - Add your navigation component here */}


        <HeroSection
          title="OurSpace Blog"
          subtitle="Discover fascinating stories, share your thoughts, and connect with a community of creative minds."
          logoSrc={logo}
        >
          <AuthButtonGroup />
        </HeroSection>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 'bold' }}
          >
            Why OurSpace?
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'rgba(15, 15, 207, 0.05)',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CreateIcon sx={{ fontSize: 48, color: '#0f0fcf', mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Creative writing
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Write and publish your own blog posts with our
                    intuitive editor. Share your ideas with the world.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'rgba(0, 212, 255, 0.05)',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <PeopleIcon sx={{ fontSize: 48, color: '#00d4ff', mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Community
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Read exciting blog posts from your favorite authors and discover new perspectives.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'rgba(15, 15, 207, 0.05)',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CategoryIcon sx={{ fontSize: 48, color: '#0f0fcf', mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Diverse topics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    From technology to lifestyle to travel –
                    find content on all the topics that interest you.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Categories Showcase */}
        <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 6, fontWeight: 'bold' }}
            >
                Popular Categories
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {Object.values(BlogpostCategory).filter(cat => cat !== 'OTHER').map((category) => (
                <Grid item key={category}>
                  <Chip
                    label={category.charAt(0) + category.slice(1).toLowerCase()}
                    sx={{
                      fontSize: '1rem',
                      py: 2.5,
                      px: 2,
                      background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
                      color: 'white',
                      fontWeight: 'bold',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Call to Action Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0f0fcf, #00d4ff)',
            color: 'white',
            py: 10,
            textAlign: 'center'
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
                Ready to tell your story?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95 }}>
                Join our community of authors and readers.
                Register for free and start writing today!
            </Typography>
          </Container>
        </Box>
      </>
    );
}