const { sequelize } = require('../config/database');
const User = require('./UserModel'); 
const Payment = require('./PaymentModel'); 


User.hasMany(Payment, { as: 'sentPayments', foreignKey: 'payerId', onDelete: 'CASCADE' });
User.hasMany(Payment, { as: 'receivedPayments', foreignKey: 'receiverId', onDelete: 'CASCADE' });

Payment.belongsTo(User, { as: 'payer', foreignKey: 'payerId' });
Payment.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

module.exports = {
  sequelize,
  User,
  Payment,
};
