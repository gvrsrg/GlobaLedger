const { _createAccount, _getAllAccounts, _getAllUserAccounts, _getAccountById } = require('../models/accountModel.js')

const createAccount = async (req, res) => {
    const { balance, currency, name, userId } = req.body
    const accountInfo = { balance, currency, name, userId } 
    try {
        const newAccount = await _createAccount(accountInfo)
        res.json(newAccount)
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
        const { userid, email } = req.params

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

module.exports = { createAccount, getAllAccounts, getAllUserAccounts, getAccountById }
