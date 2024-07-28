
const { addTransaction, getAllTransactionsForPeriod, getUserTransactionsForPeriod, getUserBudgetForPeriod } = require('../controllers/transactionController.js')

const express = require('express')

const transactionRouter = express.Router()


transactionRouter.get('/budget/byuserid/:userid/:fromdate/:todate', getUserBudgetForPeriod);
transactionRouter.get('/budget/byemail/:email/:fromdate/:todate', getUserBudgetForPeriod);
transactionRouter.get('/byuserid/:userid/:fromdate/:todate', getUserBudgetForPeriod);
transactionRouter.get('/byemail/:email/:fromdate/:todate', getUserTransactionsForPeriod);
transactionRouter.get('/byperiod/:fromdate/:todate', getAllTransactionsForPeriod);
transactionRouter.post('/', addTransaction);


module.exports = {
    transactionRouter
};
