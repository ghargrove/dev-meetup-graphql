import React from 'react';

import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { brewersQuery, createBrewerMutation } from '../queries';

const BrewerForm = ({ onSubmit }) => (
  <Mutation
    mutation={createBrewerMutation}
    update={(cache, { data }) => {
      const { createBrewer: { brewer: addedBrewer } } = data;
      const { brewers } = cache.readQuery({ query: brewersQuery });

      // Update the apollo cache w/ the new result
      cache.writeQuery({
        query: brewersQuery,
        data: { brewers: [...brewers, addedBrewer] },
      });
    }}
    onError={(e) => console.warn(e)}
  >
    {createBrewer => (
      <Formik
        initialValues={{ name: '', location: '' }}
        onSubmit={(values) => {
          createBrewer({ variables: { brewer: values } })
            .then(onSubmit);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Typography variant="h5">Add Brewer</Typography>
            <FormControl fullWidth style={{ margin: '1em 0' }}>
              <TextField type="text" name="name" placeholder="Name" onChange={handleChange} value={values.name} />
            </FormControl>
            <FormControl fullWidth style={{ margin: '1em 0' }}>
              <TextField type="text" name="location" placeholder="Location" onChange={handleChange} value={values.location} />
            </FormControl>
            <Button type="submit" size="small" variant="contained" style={{ marginTop: '8px' }}>Save</Button>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);

BrewerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BrewerForm;
