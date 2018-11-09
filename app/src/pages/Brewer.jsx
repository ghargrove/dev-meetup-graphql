import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { getBrewerQuery } from '../queries';

const BeerCard = ({ name, description }) => (
  <Card>
    <CardContent>
      <IconButton style={{ float: 'right' }} variant="fab"><DeleteIcon /></IconButton>
      <Typography variant="h6">{name}</Typography>
      <Typography style={{ color: 'rgba(0, 0, 0, 0.54)' }} variant="caption">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

BeerCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};

BeerCard.defaultProps = {
  description: 'No description available',
};

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
                  Beers on Tap
                </Typography>
              </Grid>
              {
                beers.map(beer => <Grid item key={beer.id} xs={6} md={4}><BeerCard {...beer}  /></Grid>)
              }
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
