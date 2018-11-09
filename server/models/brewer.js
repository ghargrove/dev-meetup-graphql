
module.exports = (sequelize, DataTypes) => {
  const Brewer = sequelize.define('Brewer', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {});

  Brewer.associate = (models) => {
    Brewer.hasMany(models.Beer, { as: 'Beers', foreignKey: 'brewerId' });
  };

  return Brewer;
};
