const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');

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

// Seed the db
models.sequelize.sync({ force: true }).then(() => {

  models.sequelize.getQueryInterface().bulkInsert('Brewers', [
    { name: 'Anheuser-Busch', createdAt: new Date(), updatedAt: new Date() },
    { name: 'MillerCoors', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Heineken', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Pabst Brewing', createdAt: new Date(), updatedAt: new Date() },
  ], {});

  models.sequelize.getQueryInterface().bulkInsert('Beers', [
    { brewerId: 1, name: 'Budweiser', createdAt: new Date(), updatedAt: new Date() },
    { brewerId: 1, name: 'Bud Light', createdAt: new Date(), updatedAt: new Date() },
    { brewerId: 1, name: 'Natural Light', createdAt: new Date(), updatedAt: new Date() },
  ], {});
});

const app = express();
app.use(cors());

server.applyMiddleware({ app, path: '/' });

app.listen(3000, () => {
  console.warn('App is running');
});
