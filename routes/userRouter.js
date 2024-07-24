
const { getUsers, createUser, getUserByEmail, getUserById, getAllUsers } = require('../controllers/userController.js')


const express = require('express')

const router = express.Router()

router.get('/byemail/:email', getUserByEmail);
router.get('/byid/:id', getUserById);
router.post('/', createUser);
router.get('/', getAllUsers);

module.exports = {
    router
};
