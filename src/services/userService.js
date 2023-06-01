import db from "../models"
import jwt from 'jsonwebtoken'
import fs from 'fs'

let handleUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let checkEmailExist = await checkEmail(email)
            if (checkEmailExist) {
                let user = await db.User.findOne({ where: { email: email }, raw: true })
                if (user) {
                    let publicKey = fs.readFileSync('D:\\fullstack\\qlPhongKhamBenh\\src\\key\\rsa.public')
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

export default {
    handleUser, getAllUser, getUser
}