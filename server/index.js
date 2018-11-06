const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./types');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/playground',
    settings: {
      // 'editor.theme': 'light',
    },
  },
});

const app = express();
app.use(cors());

server.applyMiddleware({ app, path: '/' });

app.listen(3000, () => {
  console.warn('App is running');
});
