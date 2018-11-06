import React from 'react';

import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const brewersQuery = gql`
 {
    brewers {
      id
      name
    }
 }
`;

const BrewerCard = ({ id, name }) => (
  <Grid item xs={6} md={4}>
    <Card>
      <CardContent>
        <Typography variant="h6">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/brewers/${id}`} size="small">Read more</Button>
      </CardActions>
    </Card>
  </Grid>
);

BrewerCard.propTypes = {
  name: PropTypes.string.isRequired,
};

const Home = () => (
  <Query query={brewersQuery}>
    {(({ loading, data }) => {
      if (loading) {
        return (<div>Loading brewers</div>);
      }

      return (
        <Grid container spacing={16}>
          {data.brewers.map(brewer => <BrewerCard key={brewer.id} {...brewer} />)}
        </Grid>
      );
    })}
  </Query>
);

export default Home;
