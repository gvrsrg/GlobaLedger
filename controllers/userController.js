const { _createUser, _getAllUsers, _getUserByEmail, _getUserById } = require('../models/userModel.js')

const createUser = async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    const userInfo = { email, password, firstname, lastname }
    try {
        const newUser = await _createUser(userInfo)
        req.session.user = newUser;
        res.json(newUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error creating user"})
    }
}

const getUsers = async (req, res) => {
    console.log("getting users");
    const { email, id } = req.query

    if (email) {
        console.log("getting users by email");
        try {
            const user = await _getUserByEmail(email)
            console.log(user);
            res.json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error getting user" })
        }
    } else if (id) {
        console.log("getting users by id");
        try {
            const user = await _getUserById(id)
            res.json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error getting user" })
        }
    } else {
        console.log("getting all users");
        try {
            const users = await _getAllUsers()
            res.json(users)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error getting user list" })
        }
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await _getAllUsers()
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting user list" })
    }
}


const getUserByEmail = async (req, res) => {
    const { email } = req.params
    console.log(email);
    try {
        const user = await _getUserByEmail(email)
        console.log(user);
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error getting user"})
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await _getUserById(id)
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error getting user"})
    }
}

module.exports = { getUsers, createUser, getUserByEmail, getAllUsers, getUserById }
