import React from 'react';
import { useFormik } from 'formik';
import { Author, Category } from '../../common/interfaces';
import { Grid, InputLabel, Select, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
  video: {
    name: string;
    authorId: number;
    catIds: number[];
  };
  authors: Author[];
  categories: Category[];
}

export const VideoForm: React.FC<VideoFormProps> = ({ video, authors, categories }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: video,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
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
          />
        </Grid>
      </Grid>
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
            value={formik.values.authorId}>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Select>
        </Grid>
      </Grid>
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
            value={formik.values.catIds}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Grid>
      </Grid>
    </form>
  );
};
