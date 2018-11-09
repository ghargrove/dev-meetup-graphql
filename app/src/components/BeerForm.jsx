import React from 'react';

import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { createBeerMutation, getBrewerQuery } from '../queries';

const BeerForm = ({ brewerId, onSubmit }) => (
  <Mutation
    mutation={createBeerMutation}
    update={(cache, { data: { createBeer } }) => {
      const { success, beer } = createBeer;
      if (success) {
        const variables = { id: brewerId };

        // Update the cache
        const { getBrewer: brewer } = cache.readQuery({
          query: getBrewerQuery,
          variables,
        });

        cache.writeQuery({
          data: {
            getBrewer: {
              ...brewer,
              beers: [...brewer.beers, beer],
            },
          },
          query: getBrewerQuery,
          variables,
        });
      }
    }}
  >
    {createBeer => (
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={(values) => {
          const variables = {
            brewerId,
            beer: values,
          };
          createBeer({ variables }).then(onSubmit);
        }}
      >
        {({ values, handleChange }) => (
          <Form style={{ float: 'right' }}>
            <Typography variant="h5">Add Beer</Typography>
            <FormControl fullWidth style={{ margin: '1em 0' }}>
              <TextField type="text" name="name" placeholder="Name" onChange={handleChange} value={values.name} />
            </FormControl>
            <FormControl fullWidth style={{ margin: '1em 0' }}>
              <TextField type="text" name="description" placeholder="Description" onChange={handleChange} value={values.description} />
            </FormControl>
            <Button type="submit" size="small" variant="contained" style={{ marginTop: '8px' }}>Save</Button>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);

BeerForm.propTypes = {
  brewerId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BeerForm;
