
module.exports = (sequelize, DataTypes) => {
  const Brewer = sequelize.define('Brewer', {
    name: DataTypes.STRING,
  }, {});
  Brewer.associate = (models) => {
    // associations can be defined here
  };

  // Seed the db
  Brewer.sync({ force: true }).then(() => {
    sequelize.getQueryInterface().bulkInsert('Brewers', [
      { name: 'Anheuser-Busch', createdAt: new Date(), updatedAt: new Date() },
      { name: 'MillerCoors', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Heineken', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pabst Brewing', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  });

  return Brewer;
};
