const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/api/v1/profiles', controller.profiles.get);
router.get('/api/v1/profiles/:id', controller.profiles.getById);
// router.post('/v1/profiles', controller.profiles.insert);
// router.put('/v1/profiles/:id', controller.profiles.update);
// router.delete('/v1/profiles/:id', controller.profiles.destroy);

module.exports = router;