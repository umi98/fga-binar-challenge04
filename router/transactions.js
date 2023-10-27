const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/v1/transactions', controller.transactions.get);
router.get('/v1/transactions/:id', controller.transactions.getById);
router.post('/v1/transactions', controller.transactions.insert);
router.put('/v1/transactions/:id', controller.transactions.update);
router.delete('/v1/transactions/:id', controller.transactions.destroy);

module.exports = router;