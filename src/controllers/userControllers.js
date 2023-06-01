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

let deleteUser = async (req, res) => {
    let id = req.params.id
    if (id) {
        let response = await userService.deleteUser(id)
        res.send(response)
    } else {
        res.status(404).json("failed")
    }

}

let editUser = async (req, res) => {
    let id = req.params.id
    let data = req.body
    if (id) {
        let user = await userService.editUser(id, data)
        res.send(user)
    } else {
        res.status(404).json("Id is not found")
    }



}

export default {
    checkLogin, getUser, deleteUser,
    editUser
}