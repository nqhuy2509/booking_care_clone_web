import express from 'express'
import UserController from '../controllers/UserController'

let router = express.Router()

let initAPIRoute = (app) => {
    router.post('/login', UserController.handleLogin)

    return app.use('/api/v1', router)
}

export default initAPIRoute
