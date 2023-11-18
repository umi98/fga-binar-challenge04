const express = require('express');
const router = express.Router();
const controller = require('../app/controller');
const multer = require('multer')();

router.get('/api/v1/users', controller.users.get);
router.get('/api/v1/users/:id', controller.users.getById);
router.post('/api/v1/users', controller.users.insert);
router.put('/api/v1/users/:id', controller.users.update);
// router.put('/api/v1/users/changeimage/:id', controller.users.updateImage);
router.delete('/api/v1/users/:id', controller.users.destroy);

router.put('/api/v1/users/changeimage/:id',
        multer.single('image'),
        controller.users.updateImage);

module.exports = router;