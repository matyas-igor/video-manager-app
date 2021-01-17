import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, FormHelperText, Grid, InputLabel, Select, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Author, Category, VideoInput } from '../../common/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    input: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);

interface VideoFormProps {
  video: VideoInput;
  authors: Author[];
  categories: Category[];
  onSubmit: (video: VideoInput) => Promise<void>;
}

const validationSchema = yup.object({
  name: yup.string().required('Video name is required'),
  authorId: yup.number().min(1, 'Please select video author').required('Video author is required'),
  catIds: yup.array().of(yup.number().min(1)).min(1, 'Please select at least one category').required('Video categories are required'),
});

export const VideoForm: React.FC<VideoFormProps> = ({ video, authors, categories, onSubmit }) => {
  const classes = useStyles();
  const history = useHistory();
  const formik = useFormik({
    initialValues: video,
    validationSchema,
    onSubmit: (values) => {
      return onSubmit?.({
        id: video.id,
        name: values.name,
        // aligning string values types to numbers
        authorId: parseInt('' + values.authorId || '', 10),
        catIds: values.catIds.map((catId) => parseInt('' + catId || '', 10)),
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      {/* Video name */}
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <InputLabel htmlFor="name">Video name</InputLabel>
        </Grid>
        <Grid item xs={10} className={classes.input}>
          <TextField
            placeholder="Enter video name…"
            id="name"
            name="name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          {formik.touched.name && Boolean(formik.errors.name) && <FormHelperText error>{formik.errors.name}</FormHelperText>}
        </Grid>
      </Grid>

      {/* Video author */}
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <InputLabel htmlFor="authorId">Video author</InputLabel>
        </Grid>
        <Grid item xs={10} className={classes.input}>
          <Select
            native
            placeholder="Select an author…"
            id="authorId"
            name="authorId"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.authorId}
            error={formik.touched.authorId && Boolean(formik.errors.authorId)}>
            {formik.values.authorId < 1 && <option aria-label="None" value="" />}
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Select>
          {formik.touched.authorId && Boolean(formik.errors.authorId) && <FormHelperText error>{formik.errors.authorId}</FormHelperText>}
        </Grid>
      </Grid>

      {/* Video categories */}
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <InputLabel htmlFor="catIds">Video categories</InputLabel>
        </Grid>
        <Grid item xs={10} className={classes.input}>
          <Select
            native
            multiple
            placeholder="Select categories…"
            id="catIds"
            name="catIds"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.catIds}
            error={formik.touched.catIds && Boolean(formik.errors.catIds)}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {formik.touched.catIds && Boolean(formik.errors.catIds) && <FormHelperText error>{formik.errors.catIds}</FormHelperText>}
        </Grid>
      </Grid>

      {/* Form buttons */}
      <Grid container alignItems="center">
        <Grid item xs={2} />
        <Grid item xs={10} className={classes.input}>
          <Button disabled={formik.isSubmitting} type="submit" variant="contained" color="primary">
            {formik.isSubmitting ? 'Submitting…' : 'Submit'}
          </Button>
          &nbsp;
          <Button onClick={history.goBack}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};
