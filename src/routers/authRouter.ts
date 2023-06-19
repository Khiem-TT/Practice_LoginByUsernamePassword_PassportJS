import {Router} from "express";
import multer from "multer";
import {GeneralController} from "../controllers/general.controller";

const router = Router();
const upload = multer();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', upload.none(), GeneralController.login);

export default router;