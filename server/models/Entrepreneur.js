const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const Entrepreneur = sequelize.define("Entrepreneur", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    EntrepreneurFirstName: {
        type: Sequelize.STRING,
        allowNull: false

    },
    EntrepreneurLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    EntrepreneurNationalId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    EntrepreneurProfession: {
        type: Sequelize.STRING,
        allowNull: true
    },
    EntrepreneurGender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    EntrepreneurPhone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    EntrepreneurDateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = Entrepreneur;