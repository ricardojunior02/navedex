const Sequelize = require('sequelize');
const database = require('../config/database');

const Users = require('../models/Users');
const Navers = require('../models/Navers');
const Projects = require('../models/Projects');

const models = [Users, Navers, Projects];

class DataBase {
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(database[process.env.NODE_ENV]);
    
    models.map(model => model.init(this.connection));
    models.map(model => model.associate(this.connection.models))
  }
}

module.exports = new DataBase();