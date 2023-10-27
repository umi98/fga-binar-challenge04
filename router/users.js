const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/v1/users', controller.users.get);
router.get('/v1/users/:id', controller.users.getById);
router.post('/v1/users', controller.users.insert);
router.put('/v1/users/:id', controller.users.update);
router.delete('/v1/users/:id', controller.users.destroy);

module.exports = router;