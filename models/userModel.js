const { db } = require('../config/db.js')

const _createUser = async (userInfo) => {
    const {email, password, firstname, lastname} = userInfo
    const trx = await db.transaction()
    try {
        const [newUser] = await trx('users')
        .insert([
            {email, password, firstname, lastname}
        ], ['userid', 'email', 'password', 'firstname', 'lastname']);
        
        await trx.commit()
        return newUser

    } catch (error) {
        await trx.rollback()
        throw error
    }
}

const _getAllUsers = async () =>{
    console.log("get all users");
    try {
        const users = await db('users')
        return users
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getUserById = async (id) =>{
    try {
        const user = await db('users')
        .select("email","firstname", "lastname")
        .where("userid", id)
        .first()
        return user
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getUserByEmail = async (email) =>{
    try {
        console.log(email);
        const user = await db('users')
        .select("userid","firstname", "lastname", "email", "password")
        .where("email", email)
        console.log(user);
        return user[0]
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getUser = async (userInfo) =>{
    const {userid, email} = userInfo
    //let email= 'gvrsrg@gmail4.com'
    console.log("get user");
    try {
        const user = await db("users")
        .select("users.userid", "users.email")
        .where('email', '=', ''+email)
        .orWhere('users.userid', userid)
        console.log(user);
        return user
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = {
    _createUser,
    _getAllUsers,
    _getUserById,
    _getUserByEmail,
    _getUser
}