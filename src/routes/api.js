import express from 'express'
import UserController from '../controllers/UserController'

let router = express.Router()

let initAPIRoute = (app) => {
    router.post('/login', UserController.handleLogin)
    router.get('/get-all-users', UserController.handleGetAllUser)
    router.post('/create-new-user', UserController.handleCreateNewUser)
    router.put('/edit-user', UserController.handleEditUser)
    router.delete('/delete-user', UserController.handleDeleteUser)

    router.get('/allcode', UserController.getAllCode)

    return app.use('/api/v1', router)
}

export default initAPIRoute
