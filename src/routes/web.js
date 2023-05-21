import express from 'express';
import homeControllers from '../controllers/homeControllers.js';

let router = express.Router();

let initWebRoute = (app) => {
    try {
        let data = db.user.findAll()
    } catch {

    }
    router.get('/', homeControllers.getHomePage);
    return app.use("/", router)
}

export default initWebRoute;