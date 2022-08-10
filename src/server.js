import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './configs/viewEngine'
import initWebRoutes from './routes/web'
import connectDB from './configs/connectdb'
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app)
initWebRoutes(app)

connectDB(app)

let port = process.env.PORT || 8080

app.listen(port, () => console.log('Server start at http://localhost:' + port))
