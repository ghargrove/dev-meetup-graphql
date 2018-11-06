import React, { Fragment } from 'react';

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

import BrewerForm from '../components/BrewerForm';

export const brewersQuery = gql`
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  render() {
    const { showForm } = this.state;

    return (
      <Query query={brewersQuery}>
        {(({ loading, data }) => {
          if (loading) {
            return (<div>Loading brewers</div>);
          }

          return (
            <Fragment>
              <Grid container spacing={16}>
                {data.brewers.map(brewer => <BrewerCard key={brewer.id} {...brewer} />)}
              </Grid>
              <Grid container spacing={16} style={{ marginTop: '2em' }}>
                <Grid item xs={6}>
                  {
                    !showForm && (
                      <Button
                        color="primary"
                        onClick={() => {
                          this.setState(({ showForm: sf }) => ({ showForm: !sf }));
                        }}
                        size="medium"
                        variant="outlined"
                      >
                        Add New Brewer
                      </Button>
                    )
                  }
                  { showForm && (
                    <BrewerForm
                      onSubmit={() => this.setState({ showForm: false })}
                    />
                  )}
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Query>
    );
  }
}

export default Home;
