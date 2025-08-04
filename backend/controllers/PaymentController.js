const paymentService = require('../services/PaymentService');

const handleError = (error, res) => {
    console.error("Payment Error:", error.message);

    if (error.message.includes("wasn't found")) {
        return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Insufficient funds") || error.message.includes("must be positive")) {
        return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'An internal server error occurred.' });
};

class PaymentController {

    static async makePayment(req, res) {
        try {
            const { payerId, receiverId, value } = req.body;

            if (!payerId || !receiverId || value === undefined) {
                return res.status(400).json({ message: 'Payer ID, Receiver ID, and value are required.' });
            }

            const newPayment = await paymentService.makePayment({ payerId, receiverId, value });
            
            res.status(201).json(newPayment);

        } catch (error) {
            handleError(error, res);
        }
    }

    static async getAllPayments(req, res) {
        try {
            const payments = await paymentService.findAllPayments();
            res.status(200).json(payments);
        } catch (error) {
            handleError(error, res);
        }
    }
}

module.exports = PaymentController;
