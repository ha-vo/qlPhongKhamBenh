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
                    jwt.verify(user.password, publicKey, { algorithms: ['RS256'] }, function (err, decode) {
                        if (err) {
                            userData.errno = 2
                            userData.errMessage = err
                            userData.text = user.password
                            resolve(userData)
                        } else {
                            if (decode.password == password) {
                                delete user.password
                                resolve(user)
                            } else {
                                userData.errno = 3
                                userData.errMessage = "Password is incorrect"
                                userData.password1 = password
                                userData.password2 = decode.password
                                resolve(userData)
                            }
                        }

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

function test() {
    return "hello world"
}

export default {
    handleUser
}