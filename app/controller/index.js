const users = require('./api/v1/users');
const profiles = require('./api/v1/profiles');
const bankAccount = require('./api/v1/bank_account');
const transactions = require('./api/v1/transactions');
const auth = require('./api/v1/auth');

module.exports = {
    users,
    profiles,
    bankAccount,
    transactions,
    auth
}