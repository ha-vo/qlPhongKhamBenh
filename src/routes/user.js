import express from 'express';
import homeControllers from '../controllers/homeControllers.js';
import userControllers from '../controllers/userControllers.js';

let router = express.Router();

let initUserRoute = (app) => {
    router.post('/login', userControllers.checkLogin)
    router.get('/:option', userControllers.getUser)
    router.delete('/:id', userControllers.deleteUser)
    router.put('/:id', userControllers.editUser)
    router.post('/', userControllers.createUser)
    return app.use("/api/user", router)
}

export default initUserRoute;