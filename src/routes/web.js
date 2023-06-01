import express from 'express';
import homeControllers from '../controllers/homeControllers.js';

let router = express.Router();

let initWebRoute = (app) => {
    router.get('/post', homeControllers.getPostPage)
    return app.use("/", router)
}

export default initWebRoute;