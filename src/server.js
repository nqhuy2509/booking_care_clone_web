import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './configs/viewEngine'
import initWebRoutes from './routes/web'
import connectDB from './configs/connectdb'
import initAPIRoute from './routes/api'

import cors from 'cors'

require('dotenv').config()

const app = express()
// app.use(cors({ origin: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT)
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTION, PUT, PATCH, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app)
initWebRoutes(app)
initAPIRoute(app)

connectDB(app)

let port = process.env.PORT || 8080

app.listen(port, () => console.log('Server start at http://localhost:' + port))
