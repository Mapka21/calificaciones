const { Sequelize } = require('sequelize');
const Subject = require('./Subject');
const Activity = require('./Activity');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const models = {
  Subject: Subject(sequelize, Sequelize.DataTypes),
  Activity: Activity(sequelize, Sequelize.DataTypes)
};

// Establecer asociaciones
models.Subject.associate(models);
models.Activity.associate(models);

module.exports = {
  sequelize,
  ...models
};