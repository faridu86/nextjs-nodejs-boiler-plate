import path from 'path';
import Sequelize from 'sequelize';

const db = {};
const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = require('../../config/config')[env];

const ORM = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig,
);

db.User = ORM.import(path.join(__dirname, 'User.js'));

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.ORM = ORM;
db.Sequelize = Sequelize;

module.exports = db;
