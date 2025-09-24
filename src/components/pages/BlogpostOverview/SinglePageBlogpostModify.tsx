// SinglePageBlogpostModify.tsx
import * as React from 'react';
import {
  Box, Button, Card, CssBaseline, FormControl, FormLabel, Grid,
  MenuItem, TextField, Typography
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SinglePageBlogpostModifyStyles';

import BlogpostService from '../../../Services/BlogpostService';
import { BlogpostCategory, BlogpostDTO } from '../../../types/models/Blogpost';

type Mode = 'create' | 'edit';
type FormValues = Pick<BlogpostDTO, 'title' | 'text' | 'category'>;

const Schema = Yup.object({
  title: Yup.string().trim().min(3, 'Atleast 3 signs').max(80).required('A title is required'),
  category: Yup.mixed<BlogpostCategory>().oneOf(Object.values(BlogpostCategory) as BlogpostCategory[]).required('Topic is required'),
  text: Yup.string().trim().min(5, 'Atleast 5 signs').max(8000).required('A text has to be entered'),
});

export default function SinglePageBlogpostModify({
                                                   providedId,
                                                   genres,
                                                 }: {
  providedId?: string;
  genres?: BlogpostCategory[];
}) {
  const navigate = useNavigate();
  const { blogpostId: routeId } = useParams();
  const blogpostId = providedId ?? routeId ?? undefined;

  const mode: Mode = blogpostId ? 'edit' : 'create';
  const categoryOptions = (genres ?? (Object.values(BlogpostCategory) as BlogpostCategory[]));

  const [initialValues, setInitialValues] = React.useState<FormValues>({
    title: '',
    category: '' as unknown as BlogpostCategory,
    text: '',
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (mode !== 'edit' || !blogpostId) return;
    setLoading(true);
    BlogpostService.getBlogpostById(blogpostId)
      .then((bp) => {
        setInitialValues({
          title: bp.title ?? '',
          category: bp.category ?? ('' as unknown as BlogpostCategory),
          text: bp.text ?? '',
        });
      })
      .finally(() => setLoading(false));
  }, [mode, blogpostId]);

  return (
    <Grid>
      <CssBaseline enableColorScheme />
      <Box sx={styles.container}>
        <Card sx={styles.card} variant="outlined">
          <Typography sx={styles.title}>
            {mode === 'create' ? 'Create Blogpost' : 'Edit Blogpost'}
          </Typography>

          <Formik<FormValues>
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              setStatus(undefined);
              try {
                const dto: BlogpostDTO = {
                  title: values.title.trim(),
                  text: values.text.trim(),
                  category: values.category,
                };
                if (mode === 'create') {
                  await BlogpostService.createBlogpost(dto);
                } else {
                  if (!blogpostId) throw new Error('No Blogpost-Id available');
                  await BlogpostService.updateBlogpost(blogpostId, dto);
                }
                navigate('/blogposts');
              } catch (e: any) {
                setStatus(e?.response?.data?.message ?? e?.message ?? 'Error while saving');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, getFieldProps, touched, errors, isSubmitting, status }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <TextField
                    id="title"
                    placeholder="Title"
                    fullWidth
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    inputProps={{ maxLength: 255 }}
                    sx={{ bgcolor: '#fff', borderRadius: 3 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="category">Select topic</FormLabel>
                  <TextField
                    id="category"
                    select
                    placeholder="select topic"
                    fullWidth
                    {...getFieldProps('category')}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                    sx={{ bgcolor: '#ececec', borderRadius: 3 }}
                  >
                    {categoryOptions.map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="text">Text</FormLabel>
                  <TextField
                    id="text"
                    placeholder="Text"
                    fullWidth
                    multiline
                    minRows={8}
                    {...getFieldProps('text')}
                    error={Boolean(touched.text && errors.text)}
                    helperText={touched.text && errors.text}
                    sx={{ bgcolor: '#fff', borderRadius: 3 }}
                  />
                </FormControl>

                {status && <Typography variant="body2" color="error">{status}</Typography>}

                <Box sx={styles.footer}>
                  <Button type="button" variant="contained" sx={styles.cancel} onClick={() => navigate('/')} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" sx={styles.save} disabled={isSubmitting || loading}>
                    {mode === 'create' ? 'Save' : 'Update'}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Card>
      </Box>
    </Grid>
  );
}
