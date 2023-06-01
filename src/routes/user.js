import express from 'express';
import homeControllers from '../controllers/homeControllers.js';
import userControllers from '../controllers/userControllers.js';

let router = express.Router();

let initUserRoute = (app) => {
    router.post('/', userControllers.checkLogin);
    router.get('/:option', userControllers.getUser)
    return app.use("/api/user", router)
}

export default initUserRoute;