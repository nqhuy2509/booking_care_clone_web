import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing input params',
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        ...userData,
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id
    if (!id) {
        res.status(400).json({
            errCode: 1,
            message: 'Missing require params',
        })
    }
    let users = await userService.getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users,
    })
}

let handleCreateNewUser = async (req, res) => {
    let data = req.body
    let message = await userService.createNewUser(data)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.editUser(data)
    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing require parameters!!',
        })
    }
    let message = await userService.deleteUser(id)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data)
    } catch (e) {
        console.log('Get all code error', e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        })
    }
}

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode,
}
