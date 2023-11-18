const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/api/v1/bank_account', controller.bankAccount.get);
router.get('/api/v1/bank_account/:id', controller.bankAccount.getById);
router.post('/api/v1/bank_account', controller.bankAccount.insert);
router.put('/api/v1/bank_account/:id', controller.bankAccount.update);
router.put('/api/v1/withdraw/:id', controller.bankAccount.tarik);
router.put('/api/v1/deposit/:id', controller.bankAccount.deposit);
router.delete('/api/v1/bank_account/:id', controller.bankAccount.destroy);

module.exports = router;