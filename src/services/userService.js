import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                })
                if (user) {
                    let check = await bcrypt.compareSync(
                        password,
                        user.password
                    )

                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'OK'

                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Password not match'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = "Your's email isn't exist!"
                }
            } else {
                userData.errCode = 1
                userData.errMessage = "Your's email isn't exist!"
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email } })

            resolve(user ? true : false)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { handleUserLogin }
