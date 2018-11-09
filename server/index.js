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
    {
      name: 'Anheuser-Busch', location: 'St. Louis, MO', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      name: 'MillerCoors', location: 'Chicago, IL', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      name: 'Heineken', location: 'Netherlands', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      name: 'Pabst Brewing', location: 'Los Angeles, CA', createdAt: new Date(), updatedAt: new Date(),
    },
  ], {});

  models.sequelize.getQueryInterface().bulkInsert('Beers', [
    {
      brewerId: 1, name: 'Budweiser', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      brewerId: 1, name: 'Bud Light', description: 'Delicious light beer', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      brewerId: 1, name: 'Natural Light', createdAt: new Date(), updatedAt: new Date(),
    },
  ], {});
});

const app = express();
app.use(cors());

server.applyMiddleware({ app, path: '/' });

app.listen(3000, () => {
  console.warn('App is running');
});
