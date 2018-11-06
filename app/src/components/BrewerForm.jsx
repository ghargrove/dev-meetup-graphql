import React from 'react';

import { Formik, Form } from 'formik';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { brewersQuery } from '../pages/Home';

const createBrewerMutation = gql`
  mutation($brewer: BrewerProps!) {
    createBrewer(brewer: $brewer) {
      brewer {
        id
        name
      }
    }
  }
`;

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
  >
    {createBrewer => (
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values) => {
          createBrewer({ variables: { brewer: values } })
            .then(onSubmit);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Typography variant="h5">Add Brewer</Typography>
            <FormControl fullWidth style={{ marginTop: '8px' }}>
              <TextField type="text" name="name" placeholder="Name" onChange={handleChange} value={values.name} />
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
