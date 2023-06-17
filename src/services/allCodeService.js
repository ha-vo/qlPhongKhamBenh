import db from "../models"

let getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                reject({
                    errno: -5,
                    errMessenger: 'Missing type parameter'
                })
            } else {
                let data = await db.Allcode.findAll({
                    where: { type }, raw: true
                })
                reject({
                    errno: 1,
                    data: data
                })
            }
        } catch (e) {
            resolve(e)
        }
    })
}

export default {
    getAllCode
}