const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/api/v1/transactions', controller.transactions.get);
router.get('/api/v1/transactions/:id', controller.transactions.getById);
router.post('/api/v1/transactions', controller.transactions.insert);
router.put('/api/v1/transactions/:id', controller.transactions.update);
router.delete('/api/v1/transactions/:id', controller.transactions.destroy);

module.exports = router;