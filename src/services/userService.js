import db from "../models"
import jwt from 'jsonwebtoken'
import fs from 'fs'
import * as dotenv from 'dotenv'
import { resolve } from "path"

dotenv.config()

let handleUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let checkEmailExist = await checkEmail(email)
            if (checkEmailExist) {
                let user = await db.User.findOne({ where: { email: email }, raw: true })
                if (user) {
                    let publicKey = fs.readFileSync(process.env.pathKey + 'rsa.public')
                    jwt.verify(user.password, publicKey, { algorithms: 'RS256' }, function (err, decode) {
                        if (err) {
                            userData.errno = 2
                            userData.errMessage = err
                            userData.text = user.password

                        } else {
                            if (decode.password == password) {
                                userData.errno = 0
                                userData.password = password
                                userData.email = email
                                userData.errMessage = "Login is successful"
                            } else {
                                userData.errno = 3
                                userData.errMessage = "Password is incorrect"
                            }
                        }
                        resolve(userData)

                    })
                }
            } else {
                userData.errno = 1
                userData.errMessage = `Email isn't exist in our system. Please try again`
                resolve(userData)
            }
        } catch (e) {
            reject(e)
        }
    })

}

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({ where: { email: email } })
            if (data) resolve(true)
            else resolve(false)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                },
            })
            resolve({
                errno: 0,
                errMessage: "find all data successfully",
                data
            })
        } catch (err) {
            reject(err)
        }
    })
}

let getUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                },
                raw: true
            })
            if (data) {
                resolve({
                    errno: 0,
                    errMessage: "find user successfully",
                    data
                })
            } else {
                resolve({
                    errno: 1,
                    errMessage: "find user unsuccessfully",
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } })
            if (user) {
                db.User.destroy({
                    where: {
                        id: id
                    }
                })
                resolve({
                    errno: 0,
                    errMessage: "User deleted"
                })
            } else {
                resolve({
                    errno: 2,
                    errMessage: "Delete user failed because id is not exist"
                })
            }
        } catch (e) {
            reject(e)
        }

    })
}

let editUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } })
            if (user) {
                user.email = data.email
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.phoneNumber = data.phoneNumber
                await user.save()
                resolve({
                    errno: 0,
                    errMessage: "Update user successfully"
                })
            } else {
                resolve({
                    errno: 1,
                    errMessage: "Update user unsuccessfully"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let privateKey = fs.readFileSync(process.env.pathKey + 'rsa.private')
        try {
            let token = jwt.sign({ "password": data.password }, privateKey, { algorithm: 'RS256' })
            data.password = token
            var user = await db.User.create(data)
            if (user) {
                resolve({
                    errno: 0,
                    errMessage: "create user successfully"
                })
            } else {
                resolve({
                    errno: 1,
                    errMessage: "create user unsuccessfully"
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}

export default {
    handleUser, getAllUser, getUser,
    deleteUser, editUser, createUser
}