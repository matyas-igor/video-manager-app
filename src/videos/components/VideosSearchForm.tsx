import React, { useCallback, useState } from 'react';
import qs from 'query-string';
import { debounce } from 'lodash';
import { useLocation, useHistory } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(3),
    },
  })
);

export const VideosSearchForm: React.FC = () => {
  const classes = useStyles();

  // parsing location search parameters
  const { search } = useLocation();
  const history = useHistory();
  const { q } = qs.parse(search);

  // search value & updating address search `q` param
  const [value, setValue] = useState<string>((q as string) || '');
  const updateSearch = useCallback(
    // eslint-disable-line
    debounce((value: string) => {
      const params = { ...qs.parse(search), q: value };
      history.push({
        search: qs.stringify(params),
      });
    }, 250),
    []
  );
  useUpdateEffect(() => {
    updateSearch(value);
  }, [value]);

  return (
    <TextField
      className={classes.input}
      placeholder="Search for videos (name, author, category)…"
      variant="outlined"
      fullWidth
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
