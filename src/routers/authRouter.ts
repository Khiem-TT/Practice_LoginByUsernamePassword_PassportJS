import {Router} from "express";
import multer from "multer";
import {GeneralController} from "../controllers/general.controller";
import passport from "../middlewares/passport";

const router = Router();
const upload = multer();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send('You are authenticated');
});

router.post('/login', upload.none(), GeneralController.login);

export default router;