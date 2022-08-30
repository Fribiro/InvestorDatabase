const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const Funds = sequelize.define("Funds", {
    Id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    TransactionAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TransactionDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Funds;