const express = require('express');
const router = express.Router();
const controller = require('../app/controller');
const { auth } = require('../utils/jwt');
const passport = require('../utils/passport');
// const passportOAUTH = require('../utils/oauth');

router.post('/api/v1/auth/login', controller.auth.login);
router.post('/api/v1/auth/register', controller.auth.register);
router.get('/api/v1/dashboard', controller.auth.dashboard);
router.get('/api/v1/auth/whoami', auth, controller.auth.whoami);

router.get('/api/v1/register', (req, res) => {
    res.render('register.ejs');
})
router.post('/api/v1/register', controller.auth.registerForm)

router.get('/api/v1/login', (req, res) => {
    res.render('login.ejs');
})
router.post('/api/v1/login', passport.authenticate('local', {
    successRedirect: '/api/v1/dashboard',
    failureRedirect: '/api/v1/login'
}))

module.exports = router;