const { db } = require('../config/db.js')
const { _getUserByEmail } = require('./userModel.js')
const { _getAccountById } = require('./accountModel.js')
const { _getCategoryById } = require('./categoryModel.js')
const { getRate } = require('../config/currencies.js')

const getAmounts = async (transactionInfo) => {
    let { amount, categoryid, currency, description, date, accountid, userid, email } = transactionInfo
    let category;
    try {
        if (!categoryid){
            category = false;            
        } else {
            category = await _getCategoryById(categoryid);          
        }
        const account = await _getAccountById(accountid);


        // console.log(accountid, account);
        // console.log(categoryid, category);


        let accountcurrencyamount = amount
        let categorycurrencyamount = amount

        if (account.currency!=currency){
            const rate = await getRate(currency, account.currency, amount)
            accountcurrencyamount = rate.conversion_result
        }

        if ((!category)){

        } else if (category.currency!=currency){
            if (category.currency==account.currency){
                categorycurrencyamount = accountcurrencyamount
            } else {
            const rate = await getRate(currency, category.currency, amount)
            categorycurrencyamount = rate.conversion_result
            }
        }

        return {accountcurrencyamount, categorycurrencyamount}

    } catch (error) {
        throw error
    }
}

const _addTransaction = async (transactionInfo) => {
    let {amount, categoryid, currency, description, date, accountid, userid, email, income } = transactionInfo


    try {
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }

            let {accountcurrencyamount, categorycurrencyamount} = await getAmounts(transactionInfo)
            if (income){
                //categoryid = null
                amount = -amount
                accountcurrencyamount = amount
                categorycurrencyamount = 0
        }        
        const [newTransaction] = await db('transactions')
        .insert([
            {amount, categoryid, currency, description, date, accountid, userid, accountcurrencyamount, categorycurrencyamount}
        ], ['transactionid', 'amount', 'accountcurrencyamount', 'categorycurrencyamount', 'categoryid', 'currency', 'description', 'date', 'accountid', 'userid']
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
    let { fromdate, todate, userid, email } = userInfo
    console.log(userInfo);
    try {
        //userid = userid || '00000000-0000-0000-0000-000000000000'
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }
        const transactions = await db('transactions')
        .join("users", { "users.userid": "transactions.userid" })
        .join("accounts", { "accounts.accountid": "transactions.accountid" })
        .join("categories", { "categories.categoryid": "transactions.categoryid" })
        .whereBetween("date", [fromdate, todate])
        .andWhere('transactions.userid', ''+userid)
        .andWhere('transactions.amount','>', 0)
        .select('transactions.*', 'accounts.name as accountname', 'categories.name as categoryname')
        return transactions
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getUserBudgetForPeriod = async (userInfo) =>{
    console.log('get user budget');
    let { fromdate, todate, userid, email } = userInfo
    try {
        //userid = userid || '00000000-0000-0000-0000-000000000000'
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }
        const subquery = await db('transactions')
        .whereBetween("transactions.date", [fromdate, todate])
        .andWhere('transactions.userid', ''+userid)
        .select('transactions.categoryid')
        .groupBy('categoryid')
        .sum('transactions.categorycurrencyamount')
        .as('trn')
        //.toSQL()

        const budget = await db('categories')
        .where('categories.userid', ''+userid) // Move this filter before the join
        .leftJoin("transactions", { "categories.categoryid": "transactions.categoryid" })
        //.leftJoin("users", { "users.userid": "transactions.userid" })
        .whereNull('transactions.date')
        .orWhereBetween("transactions.date", [fromdate, todate])
        // .whereNotNull('transactions.categoryid')
        .where('transactions.categorycurrencyamount','>',0)

        //.orWhere('transactions.date', undefined)
        .select('categories.name as categoryname', 'categories.budgetamount as budgetamount', 'categories.currency as currency')
        .where('categories.userid', ''+userid)
//        .leftJoin(subquery, { "categories.categoryid": "trn.categoryid" })
        .groupBy('categoryname','budgetamount','categories.currency')
        .sum('transactions.categorycurrencyamount as realamount')

        return budget
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = {

    _addTransaction,
    _getAllTransactionsForPeriod,
    _getUserTransactionsForPeriod,
    _getUserBudgetForPeriod
}