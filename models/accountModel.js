const { db } = require('../config/db.js')
const { _getUserByEmail } = require('./userModel.js')

const _createAccount = async (accountInfo) => {
    let {balance, currency, name, userid, email } = accountInfo
 //   const transactionInfo = { balance, categoryid:"", currency, description:"Initial balance", date:new Date().toISOString(), accountid:newAccount.accountid, userid, email, income: true } 

    const trx = await db.transaction();
    try {
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }

        const [newAccount] = await trx('accounts')
        .insert([
            {balance, currency, name, userid }
        ], ['accountid', 'name', 'balance', 'currency']
        );
        console.log(newAccount);
        const accountid = newAccount.accountid
        await trx('transactions')
        .insert([
            {amount:-balance, currency, description:"Initial balance", date:new Date().toISOString(), accountid, userid, accountcurrencyamount:-balance, categorycurrencyamount:0}
        ], ['transactionid', 'amount', 'accountcurrencyamount', 'categorycurrencyamount', 'categoryid', 'currency', 'description', 'date', 'accountid', 'userid']
        );
        await trx.commit();
        return newAccount

    } catch (error) {
        await trx.rollback();

        throw error
    }
}

const _getAllAccounts = async () =>{
    console.log("get all user accounts");
    try {
        const accounts = await db('accounts')
        .join("users", { "users.userid": "accounts.userid" })
        return accounts
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getAllUserAccounts = async (userInfo) =>{
    const {userid, email} = userInfo
    //let email= 'gvrsrg@gmail4.com'
    console.log("get all user accounts");
    try {
        const accounts = await db("accounts")
        .select("accounts.accountid", "accounts.name", "accounts.currency", "accounts.balance", "users.userid", "users.email")
        .leftJoin("users", { "users.userid": "accounts.userid" } )
        .where('email', '=', ''+email)
        .orWhere('users.userid', userid)
        // console.log(accounts);
        return accounts
    } catch (error) {
        console.log(error);
        throw error
    }
}
const _getAllUserAccountsWithBalance = async (userInfo) =>{
    let {userid, email} = userInfo
    //let email= 'gvrsrg@gmail4.com'
    console.log("get all user accounts");
    try {
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }
        console.log(userid);
        const accounts = await db("accounts")
        .where('accounts.userid', ''+userid)
        .leftJoin('transactions',{'accounts.accountid':'transactions.accountid'})
        .select("accounts.accountid as accountid", "accounts.name as name", "accounts.currency as currency")
        .groupBy("accounts.accountid", "accounts.name", "accounts.currency")
        .sum('transactions.accountcurrencyamount as actualbalance')
        // .where('transactions.userid', ''+userid)
        // console.log(accounts);
        accounts.forEach(e=> e.actualbalance = -e.actualbalance)
        return accounts
    } catch (error) {
        console.log(error);
        throw error
    }

}

//TODO: _getUserAccounts by currency

const _getAccountById = async (id) =>{
    try {
        const account = await db('accounts')
        .select("accounts.accountid", "accounts.name", "accounts.currency", "accounts.balance", "users.email")
        .join("users", { "users.userid": "accounts.userid" })
        .where("accountid", id)
        .first()
        return account
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _updateAccountById = async (accountid, accountInfo) =>{
    let { name } = accountInfo
    try {
        const account = await db('accounts')
        .update({name})
        .where("accountid", accountid);
        return account
    } catch (error) {
        console.log(error);
        throw error
    }
}



module.exports = {
    _createAccount,
    _getAllAccounts,
    _getAllUserAccounts,
    _getAllUserAccountsWithBalance,
    _getAccountById,
    _updateAccountById
}
