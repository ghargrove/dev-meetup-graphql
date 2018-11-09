import React from 'react';

import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

const getBrewerQuery = gql`
  query($id: Int!) {
    getBrewer(id: $id) {
      id
      name
      beers {
        id
        name
      }
    }
  }
`;

const Brewer = ({ match: { params: { brewer: id } } }) => (
  <Grid container spacing={16}>
    <Query query={getBrewerQuery} variables={{ id: parseInt(id, 10) }}>
      {({ data, loading }) => {
        if (loading) {
          return (
            <Grid item xs={12}>
              <div>Loading brewer</div>
            </Grid>
          );
        }

        const { getBrewer: { name, beers } } = data;

        return (
          <Grid item xs={12}>
            <Typography variant="display1">
              Brewer
            </Typography>
            <Typography variant="title">
              {name}
            </Typography>
            <Grid container spacing={16} style={{ marginTop: '3em' }}>
              <Grid item xs={12}>
                <Typography variant="display1">
                  Current Beers Available
                </Typography>
                <ul>
                  {
                    beers.map(beer => <li key={beer.id}>{beer.name}</li>)
                  }
                </ul>
              </Grid>
            </Grid>
          </Grid>
        );
      }}
    </Query>
  </Grid>
);

Brewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Brewer;
