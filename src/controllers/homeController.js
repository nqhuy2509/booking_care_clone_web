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
    return res.send('POst crud')
}

let displayGetCRUD = async (req, res) => {
    let data = await crudService.getAllUser()
    return res.render('displaycrud', { data })
}

module.exports = { getHomePage, getCRUD, postCRUD, displayGetCRUD }
