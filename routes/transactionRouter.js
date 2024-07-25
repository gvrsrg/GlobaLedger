
const { addTransaction, getAllTransactionsForPeriod, getUserTransactionsForPeriod } = require('../controllers/transactionController.js')

const express = require('express')

const transactionRouter = express.Router()


transactionRouter.get('/byuserid/:userid/:fromdate/:todate', getUserTransactionsForPeriod);
transactionRouter.get('/byemail/:email/:fromdate/:todate', getUserTransactionsForPeriod);
transactionRouter.get('/byperiod/:fromdate/:todate', getAllTransactionsForPeriod);
transactionRouter.post('/', addTransaction);


module.exports = {
    transactionRouter
};
