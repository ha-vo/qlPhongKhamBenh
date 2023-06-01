import userService from '../services/userService.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import db from '../models/index.js'
import * as dotenv from 'dotenv'

dotenv.config()
let getPostPage = (req, res) => {
    res.render('post')
}

let saveData = async (req, res) => {
    let data = req.body
    let privateKey = fs.readFileSync(process.env.pathKey + 'rsa.private')
    try {
        let token = jwt.sign({ "password": data.password }, privateKey, { algorithm: 'RS256' })
        data.password = token
        var user = await db.User.create(data)
    } catch (err) {
        console.log(err)
    }

    if (user) res.send("Create new user successfully")
    else res.send("create new user failed")
}

export default {
    getPostPage, saveData
}