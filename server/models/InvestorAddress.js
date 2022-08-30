const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const InvestorAddress = sequelize.define("InvestorAddress", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    InvestorPoBox: {
        type: Sequelize.STRING,
        allowNull: false

    },
    InvestorPostalCode: {
        type: Sequelize.STRING,
        allowNull: false

    },
    InvestorStreet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    InvestorCity: {
        type: DataTypes.STRING,
        allowNull: false
    },

    InvestorCounty: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = InvestorAddress;