const { User } = require('../models/index');

class UserService {

    async createUser(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Wasn't able to create user");
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