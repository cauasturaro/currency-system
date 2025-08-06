const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/:id', UserController.findUserById);
router.get('/:id/balance', UserController.getUserBalance);
router.get('/:id/payments', UserController.getPaymentHistory);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
