const { _createCategory, _getAllCategories, _getAllUserCategories, _getCategoryById, _updateCategory } = require('../models/categoryModel.js')
const { expenses_cat, income_cat } = require('../config/categories.js')

const createCategory = async (req, res) => {
    const { currency, name, budgetamount, userid, email } = req.body
    const categoryInfo = { currency, name, budgetamount, userid, email } 
    try {
        const newCategory = await _createCategory(categoryInfo)
        res.redirect('/settings')
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error creating category"})
    }
}

const updateCategory = async (req, res) => {
    console.log('updateCatgeory req: ', req.body)
    const { currency, name, budgetamount, userid, email, categoryid } = req.body
    const categoryInfo = { currency, name, budgetamount, userid, email, categoryid } 
    try {
        await _updateCategory(categoryInfo)
        res.redirect('/settings')
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error updating category"})
    }
}
const getAllCategories = async (req, res) => {
    try {
        const categories = await _getAllCategories()
        res.json(categories)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting categories list" })
    }
}

const getAllUserCategories = async (req, res) => {
    try {
        let { userid, email } = req.params
        console.log(req.params);

        userid = userid || '00000000-0000-0000-0000-000000000000'
        //email = email || ''

        const userInfo = { userid, email }

        const categories = await _getAllUserCategories(userInfo)
        res.json(categories)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error getting categories list" })
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await _getCategoryById(id)
        res.json(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error getting category by id"})
    }
}

module.exports = { 
    createCategory,
    getAllCategories,
    getAllUserCategories,
    getCategoryById,
    updateCategory
 }
