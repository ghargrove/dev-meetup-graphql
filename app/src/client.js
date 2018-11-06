
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
