const { User, Payment, sequelize } = require('../models/index');
const { Op } = require('sequelize');

class PaymentService {

    async makePayment({ payerId, receiverId, value }) {
        const t = await sequelize.transaction();

        try {
            const paymentValue = parseFloat(value);
            if (isNaN(paymentValue) || paymentValue <= 0) {
                throw new Error("Payment value must be positive");
            }

            //  TO PREVENT RACE CONDITION
            const payer = await User.findByPk(payerId, { transaction: t, lock: t.LOCK.UPDATE });
            const receiver = await User.findByPk(receiverId, { transaction: t, lock: t.LOCK.UPDATE });

            if (!payer) {
                throw new Error("Payer wasn't found.");
            }
            if (!receiver) {
                throw new Error("Receiver wasn't found.");
            }

            if (payer.balance < paymentValue) {
                throw new Error("Insufficient funds.");
            }
            
            payer.balance = parseFloat(payer.balance) - paymentValue;
            receiver.balance = parseFloat(receiver.balance) + paymentValue;

            await payer.save({ transaction: t });
            await receiver.save({ transaction: t });

            const payment = await Payment.create({
                payerId,
                receiverId,
                value: paymentValue,
                status: 'completed'
            }, { transaction: t });

            await t.commit();

            return payment;

        } catch (error) {
            await t.rollback();
            console.error("Payment failed:", error.message);
            throw error; 
        }
    }

    async findPaymentById(paymentId) {
        try {
            const payment = await Payment.findByPk(paymentId, {
                include: [
                    { model: User, as: 'payer', attributes: ['id', 'name'] },
                    { model: User, as: 'receiver', attributes: ['id', 'name'] }
                ]
            });

            if (!payment) {
                throw new Error("Payment wasn't found.");
            }

            return payment;
        } catch (error) {
            if (error.message.includes("wasn't found")) {
                throw error;
            }
            console.error(`Error finding payment with ID ${paymentId}:`, error);
            throw new Error('An error occurred while fetching the payment.');
        }
    }

    async findAllPayments() {
        try {
            const payments = await Payment.findAll({
                include: [
                    { model: User, as: 'payer', attributes: ['id', 'name'] },
                    { model: User, as: 'receiver', attributes: ['id', 'name'] }
                ],
                order: [['createdAt', 'DESC']]
            });
            return payments;
        } catch (error) {
            console.error('Error fetching all payments:', error);
            throw new Error('An error occurred while fetching payments.');
        }
    }

    async getPaymentHistory(userId) {
        const payments = await Payment.findAll({
            where: {
                [Op.or]: [
                    { payerId: userId },
                    { receiverId: userId }
                ]
            },
            include: [
                { model: User, as: 'payer', attributes: ['id', 'name'] },
                { model: User, as: 'receiver', attributes: ['id', 'name'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        return payments;
    }

    
}

module.exports = new PaymentService();
