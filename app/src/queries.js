/* eslint-disable import/prefer-default-export */

/**
 * GraphQL queries
 */

import gql from 'graphql';

export const brewersQuery = gql`
 {
    brewers {
      id
      name
    }
 }
`;

export const createBrewerMutation = gql`
  mutation($brewer: BrewerProps!) {
    createBrewer(brewer: $brewer) {
      brewer {
        id
        name
      }
    }
  }
`;
