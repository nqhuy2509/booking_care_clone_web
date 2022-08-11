import db from '../models/index'
import crudService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        console.log('---------')
        return res.render('home', { data: JSON.stringify(data[0].dataValues) })
    } catch (e) {
        console.log(e)
    }
}

let getCRUD = (req, res) => {
    return res.render('crud')
}

let postCRUD = async (req, res) => {
    let message = await crudService.createNewUser(req.body)
    console.log(message)
    return res.redirect('/get-crud')
}

let displayGetCRUD = async (req, res) => {
    let data = await crudService.getAllUser()
    return res.render('displaycrud', { data })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await crudService.getUserById(userId)
        if (userData) {
            return res.render('editcrud', { data: userData })
        } else {
        }
    } else {
        return res.send('User not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    await crudService.updateUserData(data)
    return res.redirect('/get-crud')
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await crudService.deleteUserById(id)
        return res.redirect('/get-crud')
    } else {
        return res.send('User not found')
    }
}

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
}
