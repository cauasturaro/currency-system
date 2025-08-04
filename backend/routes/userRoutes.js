const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.post('/', UserController.createUser);
router.get('/:id', UserController.findUserById);
router.get('/:id/balance', UserController.getUserBalance);
router.get('/:id/payments', UserController.getPaymentHistory);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
