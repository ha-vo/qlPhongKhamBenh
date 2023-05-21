import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine.js'
import initWebRoute from './routes/web.js'
import * as dotenv from 'dotenv'
import connectDB from './config/connectDB.js'

dotenv.config()

let app = express()
let port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoute(app)

connectDB()

app.listen(port, () => {
    console.log(`Web đang chạy ở địa chỉ http://localhost:${port}`);
})