const { _addTransaction, _getAllTransactionsForPeriod, _getUserTransactionsForPeriod, _getUserBudgetForPeriod } = require('../models/transactionModel.js')


const addTransaction = async (req, res) => {
    const { amount, categoryid, currency, description, accountid, income } = req.body;
    const incomeValue = !!income;
    const { userid, email } = req.session.user;
    const date = new Date().toISOString();
    const transactionInfo = { amount, categoryid, currency, description, date, accountid, userid, email, income: incomeValue } 
    try {
        await _addTransaction(transactionInfo)
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error adding transaction"})
    }
}

const getAllTransactionsForPeriod = async (req, res) => {
    try {
        const { fromdate, todate } = req.params
        // console.log({ fromdate, todate} );
        // console.log(req.params);

        if (!fromdate || !todate) {
            res.status(404).json({ error: "no period" })

        }

        const periodInfo = { fromdate, todate }
        const transaction = await _getAllTransactionsForPeriod(periodInfo)
        res.json(transaction)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting transactions" })
    }
}

const getUserTransactionsForPeriod = async (req, res) => {
    try {
        let { userid, email, fromdate, todate } = req.params

        //userid = userid || '00000000-0000-0000-0000-000000000000'
        //email = email || ''

        const userInfo = { userid, email, fromdate, todate }
        console.log(userInfo);
        const transactions = await _getUserTransactionsForPeriod(userInfo)
        res.json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting user transactions" })
    }
}

const getUserBudgetForPeriod = async (req, res) => {
    try {
        let { userid, email, fromdate, todate } = req.params

        //userid = userid || '00000000-0000-0000-0000-000000000000'
        //email = email || ''

        const userInfo = { userid, email, fromdate, todate }
        console.log(userInfo);
        const transactions = await _getUserBudgetForPeriod(userInfo)
        res.json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting user budget" })
    }
}

module.exports = { addTransaction, getAllTransactionsForPeriod, getUserTransactionsForPeriod, getUserBudgetForPeriod  }
