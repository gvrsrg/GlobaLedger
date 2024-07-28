const { db } = require('../config/db.js')
const { _getUserByEmail } = require('./userModel.js')

const _createCategory = async (categoryInfo) => {
    let { currency, name, budgetamount, userid, email } = categoryInfo
    try {
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }
        const newCategory = await db('categories')
        .insert([
            {budgetamount, currency, name, userid }
        ], ['categoryid', 'name', 'budgetamount', 'currency']
        );
        return newCategory

    } catch (error) {
        throw error
    }
}

const _updateCategory = async (categoryInfo) => {
    console.log('updateCategory: ', categoryInfo)
    let { currency, name, budgetamount, userid, email, categoryid } = categoryInfo
    try {
        if (!userid){
            const user = await _getUserByEmail(email)
            userid = user.userid
        }

        let category = await db('categories')
        .select('categoryid' ,'currency', 'name', 'userid')
        .where({ 'categoryid':categoryid })
        .first();
        
        if (!category > 0){
            return _createCategory(categoryInfo)
        } else {
            const categoryId = category.categoryid
            category = await db('categories')
            .update({
                budgetamount: budgetamount,
                currency: currency,
                name: name
            })
            .where('categoryid', categoryId);
            return category
        }

    } catch (error) {
        throw error
    }
}




const _getAllCategories = async () =>{
    console.log("get all user categories");
    try {
        const categories = await db('categories')
        .join("users", { "users.userid": "categories.userid" })
        return categories
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getAllUserCategories = async (userInfo) =>{
    const {userid, email} = userInfo
    console.log("get all user categories");
    // console.log(userInfo, typeof email);
    try {
        const categories = await db("categories")
        .select("categories.categoryid", "categories.name", "categories.currency", "categories.budgetamount", "users.userid", "users.email")
        .leftJoin("users", { "users.userid": "categories.userid" } )
        .where('email', '=', ''+email)
        .orWhere('users.userid', userid)
        // console.log(categories);
        return categories
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getCategoryById = async (id) =>{
    try {
        const account = await db('categories')
        .select("categories.categoryid", "categories.name", "categories.currency", "categories.budgetamount", "users.email")
        .join("users", { "users.userid": "categories.userid" })
        .where("categoryid", id)
        .first()
        return account
    } catch (error) {
        console.log(error);
        throw error
    }
}




module.exports = {

    _createCategory,
    _getAllCategories,
    _getAllUserCategories,
    _getCategoryById,
    _updateCategory

}
