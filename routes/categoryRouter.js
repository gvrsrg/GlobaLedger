
const { createCategory, getAllCategories, getAllUserCategories, getCategoryById, updateCategory } = require('../controllers/categoryController.js')

const express = require('express')

const categoryRouter = express.Router()


categoryRouter.get('/byid/:id', getCategoryById);
categoryRouter.get('/byuserid/:userid', getAllUserCategories);
categoryRouter.get('/byemail/:email', getAllUserCategories);
categoryRouter.get('/', getAllCategories);
categoryRouter.post('/', createCategory);
categoryRouter.put('/', updateCategory);

module.exports = {
    categoryRouter
};
