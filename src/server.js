import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine.js'
import initWebRoute from './routes/web.js'
import initUserRoute from './routes/user.js'
import initAllCodeRouter from './routes/allcode.js'
import * as dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import cors from 'cors'

dotenv.config()

let app = express()
let port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoute(app)
initUserRoute(app)
initAllCodeRouter(app)

connectDB()

app.listen(port, () => {
    console.log(`Server đang chạy ở địa chỉ http://localhost:${port}`);
})