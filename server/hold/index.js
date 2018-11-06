const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const capitalize = require('lodash/capitalize');

const db = {};
const basename = path.basename(__filename);

const dbConfig = {
  dialect: 'sqlite',
  host: 'localhost',
  storage: path.resolve(__dirname, '../storage/db.sqlite'),
  operatorsAliases: false,
};

const sequelize = new Sequelize(
  'meetup',
  'meetup_user',
  'ilikebeer',
  dbConfig,
);

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0
    && file !== basename
    && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[capitalize(model.name)] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
