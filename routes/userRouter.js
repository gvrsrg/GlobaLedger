
const { createUser, getUserByEmail, getUserById, getAllUsers } = require('../controllers/userController.js')


const express = require('express')

const userRouter = express.Router()

userRouter.get('/byemail/:email', getUserByEmail);
userRouter.get('/byid/:id', getUserById);
userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);

module.exports = {
    userRouter
};
