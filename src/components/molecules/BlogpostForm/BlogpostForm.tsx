import * as React from 'react';
import { FormControl, FormLabel, MenuItem, TextField } from '@mui/material';
import type { FormikErrors, FormikTouched } from 'formik';
import { BlogpostCategory } from '../../../types/models/Blogpost';

export type BlogpostFormValues = {
  title: string;
  category: BlogpostCategory;
  text: string;
};

type Props = {
  getFieldProps: (name: keyof BlogpostFormValues) => any;
  touched: FormikTouched<BlogpostFormValues>;
  errors: FormikErrors<BlogpostFormValues>;
  categoryOptions: BlogpostCategory[];
};

const BlogpostForm: React.FC<Props> = ({ getFieldProps, touched, errors, categoryOptions }) => {
  return (
    <>
      <FormControl>
        <FormLabel htmlFor="title">Title</FormLabel>
        <TextField
          id="title"
          placeholder="Title"
          fullWidth
          {...getFieldProps('title')}
          error={Boolean(touched.title && errors.title)}
          helperText={touched.title && errors.title}
          inputProps={{ maxLength: 80 }}
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
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
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
    </>
  );
};

export default BlogpostForm;
