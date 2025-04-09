const Sequelize = require('sequelize');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const sequelize = new Sequelize('node-complete', 'root', process.env.SEQUELIZE_PW, {
    dialect: 'mysql', host:'localhost'
});

module.exports = sequelize;