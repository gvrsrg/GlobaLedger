
const { createAccount, getAllAccounts, getAllUserAccounts, getAccountById } = require('../controllers/accountController.js')

const express = require('express')

const accountRouter = express.Router()


accountRouter.get('/byid/:id', getAccountById);
accountRouter.get('/byuserid/:userid', getAllUserAccounts);
accountRouter.get('/byemail/:email', getAllUserAccounts);
accountRouter.post('/', createAccount);
accountRouter.get('/', getAllAccounts);

module.exports = {
    accountRouter
};
