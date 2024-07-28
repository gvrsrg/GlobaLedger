
const { createUser, getUserByEmail, getUserById, getAllUsers, updateUser } = require('../controllers/userController.js')


const express = require('express')

const userRouter = express.Router()

userRouter.get('/byemail/:email', getUserByEmail);
userRouter.get('/byid/:userid', getUserById);
userRouter.post('/', createUser);
userRouter.post('/update/:userid', updateUser);
userRouter.get('/', getAllUsers);

module.exports = {
    userRouter
};
