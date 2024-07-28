const { _createAccount, _getAllAccounts, _getAllUserAccounts, _getAccountById, _updateAccountById } = require('../models/accountModel.js')

const createAccount = async (req, res) => {
    const { balance, currency, name, userid, email } = req.body
    const accountInfo = { balance, currency, name, userid, email } 
    try {
        const newAccount = await _createAccount(accountInfo)
        res.redirect('/settings')
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error creating account"})
    }
}

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await _getAllAccounts()
        res.json(accounts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting account list" })
    }
}

const getAllUserAccounts = async (req, res) => {
    try {
        let { userid, email } = req.params
        // console.log(req.params);

        userid = userid || '00000000-0000-0000-0000-000000000000'
        //email = email || ''

        const userInfo = { userid, email }

        const accounts = await _getAllUserAccounts(userInfo)
        res.json(accounts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting account list" })
    }
}



const getAccountById = async (req, res) => {
    const { id } = req.params
    try {
        const account = await _getAccountById(id)
        res.json(account)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error getting account by id"})
    }
}
const updateAccountById = async (req, res) => {
    const { accountid } = req.params
    const { name } = req.body
    const accountInfo = {  name }
    try {
        await _updateAccountById(accountid, accountInfo)
        res.redirect('/settings')
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error updating account by id"})
    }
}
module.exports = { createAccount, getAllAccounts, getAllUserAccounts, getAccountById, updateAccountById }
