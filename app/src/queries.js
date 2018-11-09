/* eslint-disable import/prefer-default-export */

/**
 * GraphQL queries
 */

import gql from 'graphql-tag';

export const brewersQuery = gql`
 {
    brewers {
      id
      name
      location
    }
 }
`;

export const getBrewerQuery = gql`
  query($id: Int!) {
    getBrewer(id: $id) {
      id
      name
      beers {
        id
        name
        description
      }
    }
  }
`;

export const createBrewerMutation = gql`
  mutation($brewer: BrewerProps!) {
    createBrewer(brewer: $brewer) {
      brewer {
        id
        name
        location
      }
    }
  }
`;

export const removeBeerMutation = gql`
  mutation($brewerId: Int!, $beerId: Int!) {
    removeBeer(brewerId: $brewerId, beerId: $beerId) {
      beerId
      success
    }
  }
`;

export const createBeerMutation = gql`
  mutation($brewerId: Int!, $beer: BeerProps!) {
    createBeer(brewerId: $brewerId, beer: $beer) {
      success
      beer {
        id
        name
        description
      }
      success
    }
  }
`;
