const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Escipion202', {
    dialect: 'mysql', host:'localhost'
});

module.exports = sequelize;