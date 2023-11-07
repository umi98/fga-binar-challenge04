const express = require('express');
const router = express.Router();

const users = require('./users');
const profiles = require('./profiles');
const bankAccount = require('./bank_account');
const transactions = require('./transactions');
const auth = require('./auth');

router.use(users);
router.use(profiles);
router.use(bankAccount);
router.use(transactions);
router.use(auth);

module.exports = router;