

module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define('Beer', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});

  Beer.associate = (models) => {
    Beer.belongsTo(models.Brewer, { as: 'brewer' });
  };

  return Beer;
};
