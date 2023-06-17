import allCodeService from "../services/allCodeService"

const getAllCode = async (req, res) => {
    let type = req.query.type
    try {
        let data = await allCodeService.getAllCode(type)
        res.send(data)
    } catch (err) {
        res.status(400).json(err)
    }
}

export default {
    getAllCode
}