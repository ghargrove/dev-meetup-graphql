
const models = require('../models');

module.exports = {
  Query: {
    brewers: () => models.Brewer.findAll(),
    getBrewer: async (_, { id }) => {
      const brewer = await models.Brewer.findByPk(id);
      const beers = await brewer.getBeers();

      return { ...brewer.toJSON(), beers: beers || [] };
    },
  },
  Mutation: {
    createBrewer: async (_, { brewer }) => {
      const b = await models.Brewer.create(brewer);
      return { brewer: b };
    },
  },
};
