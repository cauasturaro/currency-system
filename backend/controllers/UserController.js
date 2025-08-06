const userService = require('../services/UserService');
const paymentService = require('../services/PaymentService');

const handleError = (error, res) => {
    console.error(error);

    if (error.message.includes("wasn't found") || error.message.includes("wasn't able to create")) 
        return res.status(404).json({ message: error.message });

    if (error.message.includes("Insufficient funds") || error.message.includes("must be positive"))
        return res.status(400).json({ message: error.message });

    if (error.message.includes("Error trying to authenticate"));
        return res.status(400).json({ message: "Invalid Credentials"});

    return res.status(500).json({ message: "An internal server error occurred." });
};

class UserController {

    static async registerUser(req, res) {
        try {
            const { name, email, password } = req.body; 

            if (!name || !email || !password) 
                return res.status(400).json({ message: "Name, email, and password are required." });      

            const newUser = await userService.createUser({ name, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            if (error.name === "SequelizeUniiqueConstraintError") 
                return res.status(409).json({ message: "Email already in use." });

            handleError(error, res);
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password ) 
                return res.status(400).json({ message: "All credentials are required." });

            const user = await userService.loginUser({ email, password });
            res.status(200).json(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    static async findUserById(req, res) {
        try {
            const user = await userService.findUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User wasn't found" });
            }
            res.status(200).json(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    static async getUserBalance(req, res) {
        try {
            const balance = await userService.checkBalance(req.params.id);
            res.status(200).json({ userId: req.params.id, balance });
        } catch (error) {
            handleError(error, res);
        }
    }

    static async getPaymentHistory(req, res) {
        try {
            const payments = await paymentService.getPaymentHistory(req.params.id);
            res.status(200).json(payments);
        } catch (error) {
            handleError(error, res);
        }
    }

    static async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            handleError(error, res);
        }
    }
}

module.exports = UserController;