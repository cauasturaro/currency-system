const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    }, 
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false
    }
}, {
    tableName: 'payments',
    timestamps: true
})

module.exports = Payment;