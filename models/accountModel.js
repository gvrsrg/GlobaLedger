const { db } = require('../config/db.js')
const { _getUserByEmail } = require('./userModel.js')

const _createAccount = async (accountInfo) => {
    let {balance, currency, name, userid, email } = accountInfo
    try {
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }
        const [newAccount] = await db('accounts')
        .insert([
            {balance, currency, name, userid }
        ], ['accountid', 'name', 'balance', 'currency']
        );
        return newAccount

    } catch (error) {
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
    let {balance, currency, name} = accountInfo
    try {
        const account = await db('accounts')
        .update([
            accountInfo
        ], ['accountid', 'name', 'balance', 'currency']
        )
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
    _getAccountById,
    _updateAccountById
}
