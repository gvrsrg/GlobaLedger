
const { createCategory, getAllCategories, getAllUserCategories, getCategoryById } = require('../controllers/categoryController.js')

const express = require('express')

const categoryRouter = express.Router()


categoryRouter.get('/byid/:id', getCategoryById);
categoryRouter.get('/byuserid/:userid', getAllUserCategories);
categoryRouter.get('/byemail/:email', getAllUserCategories);
categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);

module.exports = {
    categoryRouter
};
