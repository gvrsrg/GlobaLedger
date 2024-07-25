const { db } = require('../config/db.js')
const { _getUserByEmail } = require('./userModel.js')

const _addTransaction = async (transactionInfo) => {
    let {amount, categoryid, currency, description, date, accountid, userid, email } = transactionInfo
    try {
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }
        const [newTransaction] = await db('transactions')
        .insert([
            {amount, categoryid, currency, description, date, accountid, userid, }
        ], ['transactionid', 'amount', 'categoryid', 'currency', 'description', 'date', 'accountid', 'userid']
        );
        return newTransaction
        //TODO different currencies of transaction, account, category
        //change balance

    } catch (error) {
        throw error
    }
}

const _getAllTransactionsForPeriod = async (periodInfo) =>{
    const { fromdate, todate } = periodInfo
    try {
        const transactions = await db('transactions')
        .join("users", { "users.userid": "transactions.userid" })
        .join("accounts", { "accounts.accountid": "transactions.accountid" })
        .join("categories", { "categories.categoryid": "transactions.categoryid" })
        .whereBetween("date", [fromdate, todate] )
        return transactions
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getUserTransactionsForPeriod = async (userInfo) =>{
    const { fromdate, todate, userid, email } = userInfo
    console.log(userInfo);
    try {
        const transactions = await db('transactions')
        .join("users", { "users.userid": "transactions.userid" })
        .join("accounts", { "accounts.accountid": "transactions.accountid" })
        .join("categories", { "categories.categoryid": "transactions.categoryid" })
        .whereBetween("date", [fromdate, todate] )
        //.andWhere('email', ''+email)
        //.orWhere('users.userid', userid)
        return transactions
    } catch (error) {
        console.log(error);
        throw error
    }
}


module.exports = {

    _addTransaction,
    _getAllTransactionsForPeriod,
    _getUserTransactionsForPeriod
}
