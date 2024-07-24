
const { createAccount, getAllAccounts, getAllUserAccounts, getAccountById } = require('../controllers/accountController.js')

const express = require('express')

const accountRouter = express.Router()


accountRouter.get('/byid/:id', getAccountById);
accountRouter.get('/byuserid/:id', getAllUserAccounts);
accountRouter.post('/', createAccount);
accountRouter.get('/', getAllAccounts);

module.exports = {
    accountRouter
};
