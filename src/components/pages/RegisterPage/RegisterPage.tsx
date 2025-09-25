import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {Card, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RegisterUser } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import RegisterPageStyle from './RegisterPageStyle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterSchema = Yup.object({
  firstName: Yup.string().trim().min(2, 'At least 2 letter').max(20).required('You have to enter a first name'),
  lastName: Yup.string().trim().min(2, 'At least 2 letter').max(50).required('You have to enter a last name'),
  email: Yup.string().email('Invalid email').max(200).required('You have to enter an email'),
  password: Yup.string().min(4, 'At least 4 signs').max(200).required('You have to enter a password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please enter the same password'),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <Grid>
      <CssBaseline enableColorScheme />
      <Stack sx={RegisterPageStyle.signUpContainer} direction="column" justifyContent="space-between">
        <Card sx={RegisterPageStyle.registerCard} variant="outlined">
          <Box className="registerHeader" sx={{ mb: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="text"
              onClick={() => navigate('/')}
            >
              Zurück
            </Button>
          </Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>

          <Formik<RegisterValues>
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
              setStatus(undefined);
              try {
                const { confirmPassword, ...rest } = values;
                const payload: RegisterUser = {
                  firstName: rest.firstName,
                  lastName: rest.lastName,
                  email: rest.email,
                  password: rest.password,
                };
                await UserService.registerUser(payload);
                setStatus({ success: 'Account has been created. You can log in now!' });
                resetForm();
              } catch (err: any) {
                const msg =
                  err?.response?.data?.message ||
                  err?.response?.data?.error ||
                  err?.message ||
                  'Register failed.';
                setStatus({ error: msg });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, getFieldProps, touched, errors, isSubmitting, status }) => (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <TextField
                    fullWidth
                    id="firstName"
                    placeholder="Luca"
                    autoComplete="given-name"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <TextField
                    fullWidth
                    id="lastName"
                    placeholder="Widmer"
                    autoComplete="family-name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    fullWidth
                    id="password"
                    type="password"
                    placeholder="••••••"
                    autoComplete="new-password"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••"
                    autoComplete="new-password"
                    {...getFieldProps('confirmPassword')}
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </FormControl>

                {status?.error && (
                  <Typography variant="body2" color="error">
                    {status.error}
                  </Typography>
                )}
                {status?.success && (
                  <Typography variant="body2" color="success.main">
                    {status.success}
                  </Typography>
                )}

                <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing up…' : 'Sign up'}
                </Button>
              </Box>
            )}
          </Formik>
        </Card>
      </Stack>
    </Grid>
  );
}
