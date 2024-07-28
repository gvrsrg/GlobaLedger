
const { createAccount, getAllAccounts, getAllUserAccounts, getAccountById, updateAccountById, getAllUserAccountsWithBalance } = require('../controllers/accountController.js')

const express = require('express')

const accountRouter = express.Router()


accountRouter.get('/byid/:id', getAccountById);
accountRouter.get('/byuserid/:userid', getAllUserAccounts);
accountRouter.get('/byemail/:email', getAllUserAccounts);
accountRouter.get('/withbalance/byemail/:email', getAllUserAccountsWithBalance);
accountRouter.get('/', getAllAccounts);
accountRouter.post('/', createAccount);
accountRouter.post('/:accountid', updateAccountById);

module.exports = {
    accountRouter
};
