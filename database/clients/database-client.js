import Admin from '../db/models/admin';
const { Sequelize } = require('sequelize');

var environment = 'local';
var config = require(__dirname + '/../../config/config.json')[environment];

// get information about local or aws MYSQL credentials 
const connectionSetting = () => {
  return {
    database: config.database,
    host: config.host,
    username: config.username,
    password: config.password,
    port: config.port,
  };
};

const connSetting = connectionSetting();
const sequelize = new Sequelize({
  ...connSetting,
  dialect: config.dialect,
  logging: true
});

const db = {};
const AdminModel = Admin(sequelize);
db[AdminModel.name] = AdminModel;


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
