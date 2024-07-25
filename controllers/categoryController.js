const { _createCategory, _getAllCategories, _getAllUserCategories, _getCategoryById } = require('../models/categoryModel.js')

const createCategory = async (req, res) => {
    const { currency, name, budgetamount, userid, email } = req.body
    const categoryInfo = { currency, name, budgetamount, userid, email } 
    try {
        const newCategory = await _createCategory(categoryInfo)
        res.json(newCategory)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error creating category"})
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
    getCategoryById
 }
