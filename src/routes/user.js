import express from 'express';
import userControllers from '../controllers/userControllers.js';
import allCodeControllers from '../controllers/allCodeControllers.js';

let router = express.Router();

let initUserRoute = (app) => {
    router.post('/', userControllers.createUser)
    router.post('/login', userControllers.checkLogin)
    router.get('/:option', userControllers.getUser)
    router.delete('/:id', userControllers.deleteUser)
    router.put('/:id', userControllers.editUser)

    return app.use("/api/user", router)
}

export default initUserRoute;