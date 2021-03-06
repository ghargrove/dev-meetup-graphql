import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

import BeerForm from '../components/BeerForm';
import { getBrewerQuery, removeBeerMutation } from '../queries';

const BeerCard = ({ description, name, onDelete }) => (
  <Card>
    <CardContent>
      <IconButton onClick={onDelete} style={{ float: 'right' }} variant="fab"><DeleteIcon /></IconButton>
      <Typography variant="h6">{name}</Typography>
      <Typography style={{ color: 'rgba(0, 0, 0, 0.54)' }} variant="caption">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

BeerCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

class Brewer extends Component {
  constructor(props) {
    super(props);
    this.state = { showNewBeerForm: false };
  }

  render() {
    const { match: { params: { brewer: id } } } = this.props;
    const { showNewBeerForm } = this.state;

    return (
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

            const { getBrewer: brewer } = data;
            const { name, beers } = brewer;

            return (
              <Grid item xs={12}>
                <Typography variant="display1">
                  Brewer
                  <Button 
                    onClick={() => {
                      this.setState(prevState => ({ showNewBeerForm: !prevState.showNewBeerForm }));
                    }} 
                    style={{ float: 'right' }}>
                    Add Beer
                  </Button>
                </Typography>
                <Typography variant="title">
                  {name}
                </Typography>
                { 
                  showNewBeerForm
                  && (
                    <BeerForm
                      brewerId={parseInt(id, 10)}
                      onSubmit={() => this.setState({ showNewBeerForm: false })}
                    />
                  )
                }
                <Grid container spacing={16} style={{ marginTop: '3em' }}>
                  <Grid item xs={12}>
                    <Typography variant="display1">
                      Beers on Tap
                    </Typography>
                  </Grid>
                  <Mutation
                    mutation={removeBeerMutation}
                    update={(cache, { data: cacheData }) => {
                      const { removeBeer: { beerId, success } } = cacheData;

                      // If successful, then update the cache
                      //
                      if (success) {
                        const { getBrewer: { beers: cachedBeers } } = cache.readQuery({
                          query: getBrewerQuery,
                          variables: { id: parseInt(id, 10) },
                        });


                        // Find the position of the deleted beer
                        //
                        const idx = cachedBeers.indexOf(
                          cachedBeers.find(b => b.id === beerId),
                        );

                        cachedBeers.splice(idx, 1);

                        // Update the cache
                        //
                        cache.writeQuery({
                          data: { getBrewer: { ...brewer, beers: cachedBeers } },
                          query: getBrewerQuery,
                          variables: { id: parseInt(id, 10) },
                        });
                      }
                    }}
                  >
                    {
                      (removeBeer) => {
                        if (beers.length === 0) {
                          return (
                            <Grid item xs={12}>
                              <Typography variant="title">
                                <span aria-label="whoops" role="img">🤔</span>
                                No beers on tap
                              </Typography>
                            </Grid>
                          );
                        }

                        return (
                          beers.map((beer) => {
                            const onDelete = () => {
                              removeBeer({
                                variables: {
                                  brewerId: parseInt(id, 10),
                                  beerId: parseInt(beer.id, 10),
                                },
                              });
                            };

                            return (
                              <Grid item key={beer.id} xs={6} md={4}>
                                <BeerCard {...beer} description={beer.description || 'No description available'} brewerId={id} onDelete={onDelete} />
                              </Grid>
                            );
                          })
                        );
                      }
                    }
                  </Mutation>
                </Grid>
              </Grid>
            );
          }}
        </Query>
      </Grid>
    )
  }
}

Brewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Brewer;
