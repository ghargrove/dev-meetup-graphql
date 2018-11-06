
const models = require('../models');

module.exports = {
  Query: {
    brewers: () => models.Brewer.findAll(),
  },
  Mutation: {
    createBrewer: async (_, { brewer }) => {
      const b = await models.Brewer.create(brewer);
      return { brewer: b };
    },
  },
};
