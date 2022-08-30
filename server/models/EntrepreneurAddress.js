const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const EntrepreneurAddress = sequelize.define("EntrepreneurAddress", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    EntrepreneurPoBox: {
        type: Sequelize.STRING,
        allowNull: false

    },
    EntrepreneurPostalCode: {
        type: Sequelize.STRING,
        allowNull: false

    },
    EntrepreneurStreet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EntrepreneurCity: {
        type: DataTypes.STRING,
        allowNull: false
    },

    EntrepreneurCounty: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = EntrepreneurAddress;