const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./types');
const resolvers = require('./resolvers');
// const models = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/server/playground',
    settings: {
      // 'editor.theme': 'light',
    },
  },
});

const app = express();

server.applyMiddleware({ app, path: '/server' });

app.listen(3000, () => {
  console.warn('App is running');
});
