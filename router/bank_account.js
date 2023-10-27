const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/v1/bank_account', controller.bankAccount.get);
router.get('/v1/bank_account/:id', controller.bankAccount.getById);
router.post('/v1/bank_account', controller.bankAccount.insert);
router.put('/v1/bank_account/:id', controller.bankAccount.update);
router.put('/v1/withdraw/:id', controller.bankAccount.tarik);
router.put('/v1/deposit/:id', controller.bankAccount.deposit);
router.delete('/v1/bank_account/:id', controller.bankAccount.destroy);

module.exports = router;