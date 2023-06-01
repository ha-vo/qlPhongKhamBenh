import userService from '../services/userService.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import db from '../models/index.js'
import * as dotenv from 'dotenv'

dotenv.config()
let getPostPage = (req, res) => {
    res.render('post')
}



export default {
    getPostPage
}