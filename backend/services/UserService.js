const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/index');

const bcryptCost = 10;

class UserService {

    async createUser({ name, email, password }) {
        try {
            const passwordHash = await bcrypt.hash(password, bcryptCost);

            const user = await User.create({
                name, 
                email,
                passwordHash
            });

            const userJson = user.toJSON();
            delete userJson.passwordHash;

            return userJson;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async loginUser({ email, password }) {
        try {
            const user = await User.findOne({ where: {email} });
            if (!user) 
                throw new Error("Authentication failed: User not found.");
            
            const passwordMatch = await bcrypt.compare(password, user.passwordHash);
            
            if (!passwordMatch) 
                throw new Error("Authentication failed: Invalid credentials.");

            const payload = {
                id: user.id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'});

            const userJson = user.toJSON();
            delete userJson.passwordHash;

            return { user: userJson, token };
        } catch (error) {
            console.error("Error trying to authenticate:", error);
            throw error;
        }
    }

    async findUserById(userId) {
        const user = await User.findByPk(userId);
        return user;
    }

    async checkBalance(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['balance']
            });

            if (!user) {
                throw new Error("User wasn't found");
            }

            return parseFloat(user.balance);

        } catch (error) {
            if (error.message === "User wasn't found") {
                throw error;
            }
           
            console.error(`Error trying to check user ${userId} balance:`, error);
            throw new Error('An error ocurred tryng to fetch for balance.');
        }
    }

    async deleteUser(userId) {
        try {
            const found = await User.destroy({
                where: {
                    id: userId
                }
            });

            if (found === 0) {
                throw new Error("User wasn't found");
            }

            return found;
            
        } catch (error) {
            if (error.message.includes("User wasn't found")) {
                throw error;
            }

            console.error(`Error trying to delete ${userId}:`, error);
            throw new Error("An error ocurred trying to delete user");
        }
    }
}

module.exports = new UserService();