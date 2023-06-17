import express from 'express';

import allCodeControllers from '../controllers/allCodeControllers.js';


let router = express.Router()

let initAllCodeRouter = (app) => {
    router.get('/', allCodeControllers.getAllCode)
    return app.use('/api/allCode', router)
}

export default initAllCodeRouter
