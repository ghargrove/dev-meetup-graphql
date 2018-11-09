
const models = require('../models');

module.exports = {
  Mutation: {
    createBeer: async (_, { brewerId, beer }) => {
      const brewer = await models.Brewer.findByPk(brewerId);
      if (!brewer) {
        return { success: false, brewer: null };
      }

      // Create the beer
      const newBeer = await models.Beer.create({ ...beer, brewerId: brewer.id }); 
      const beerJson = { ...newBeer.toJSON(), brewer: brewer.toJSON() };

      return ({ success: true, beer: beerJson });
    },
    removeBeer: async (_, { brewerId, beerId }) => {
      // Find the brewer
      //
      const brewer = await models.Brewer.findByPk(brewerId);

      if (!brewer) {
        return { beerId: null, success: false };
      }
      
      // Get the beer tied to the brewer
      //
      const beer = await brewer.getBeers({ where: { id: beerId } });

      // Remove
      //
      if (beer.length > 0) {
        const p = await beer[0].destroy();
        return { beerId: beer[0].id, success: true };
      }

      return { beerId: null, success: false };
    }
  }
};
