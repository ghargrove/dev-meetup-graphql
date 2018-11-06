
const models = require('../models');

module.exports = {
  Query: {
    brewers: () => models.Brewer.findAll(),
  },
};
