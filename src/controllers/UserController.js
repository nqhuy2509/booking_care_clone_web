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

module.exports = { handleLogin }
