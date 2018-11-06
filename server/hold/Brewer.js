
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
    },
  });

  // User.sync().then(() => {

  // })

  return User;
};
