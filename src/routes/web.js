import express from 'express';
import homeControllers from '../controllers/homeControllers.js';

let router = express.Router();

let initWebRoute = (app) => {
    router.post('/', homeControllers.getHomePage);
    router.get('/post', homeControllers.getPostPage)
    router.post('/saveData', homeControllers.saveData)
    return app.use("/", router)
}

export default initWebRoute;