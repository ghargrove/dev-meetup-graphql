
const models = require('../models');

module.exports = {
  Query: {
    brewers: () => models.Brewer.findAll(),
    getBrewer: (_, { id }) => {
      const brewer = models.Brewer.findByPk(id);
      return brewer;
    },
  },
  Mutation: {
    createBrewer: async (_, { brewer }) => {
      const b = await models.Brewer.create(brewer);
      return { brewer: b };
    },
  },
};
