import bcrypt from 'bcryptjs'
import db from '../models/index'

const salt = bcrypt.genSaltSync(10)

let createNewUser = async (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let hashPasswordFromByBcypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromByBcypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resole('OK create a new user')
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resole, reject) => {
        try {
            let users = db.User.findAll({ raw: true })
            resole(users)
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resole, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt)
            resole(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserById = (id) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id }, raw: true })
            if (user) {
                resole(user)
            } else {
                resole({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            await db.User.update(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                },
                { where: { id: data.id } }
            )
            resole()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { createNewUser, getAllUser, getUserById, updateUserData }
