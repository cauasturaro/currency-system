const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        defaultValue: 0.00
    },
}, {
    tableName: 'users',
    timestamps: true
})

module.exports = User;