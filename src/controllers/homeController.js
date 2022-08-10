import db from '../models/index'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        console.log('---------')
        console.log(data)
        return res.render('home')
    } catch (e) {
        console.log(e)
    }
}

module.exports = { getHomePage }
