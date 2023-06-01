import userService from '../services/userService.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import db from '../models/index.js'

let checkLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errno: 4,
            errMessage: "email or password is required"
        })
    }
    let data = await userService.handleUser(email, password)
    res.send(data)

}

let getUser = async (req, res) => {
    let option = req.params.option
    if (option == 'all') {
        var data = await userService.getAllUser()
    } else {
        var data = await userService.getUser(option)
    }
    res.send(data)


}

export default {
    checkLogin, getUser
}