const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const Investor = sequelize.define("Investor", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    InvestorFirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    InvestorLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    InvestorNationalId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    InvestorProfession: {
        type: Sequelize.STRING,
        allowNull: true
    },
    InvestorGender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    InvestorPhone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    InvestorDateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    },

    InvestmentRange: {
        type: DataTypes.STRING,
        allowNull: true
    },

    InvestorExpertise: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Investor;