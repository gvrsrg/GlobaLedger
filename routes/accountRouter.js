
const { createAccount, getAllAccounts, getAllUserAccounts, getAccountById, updateAccountById } = require('../controllers/accountController.js')

const express = require('express')

const accountRouter = express.Router()


accountRouter.get('/byid/:id', getAccountById);
accountRouter.get('/byuserid/:userid', getAllUserAccounts);
accountRouter.get('/byemail/:email', getAllUserAccounts);
accountRouter.get('/', getAllAccounts);
accountRouter.post('/', createAccount);
accountRouter.put('/:accountid', updateAccountById);

module.exports = {
    accountRouter
};
