import express from "express";
import bodyParser from "body-parser";
import {DatabaseModel} from "./src/models/database.model";
import session from "express-session";
import passport from "passport";
import router from "./src/routers/authRouter";

const port = 8000;
const app = express();

DatabaseModel.connectDB()
    .then(() => console.log('DB connected!'))
    .catch(error => console.log('DB connection error', error.message));

app.set('view engine', 'ejs');
app.set('views', './src/views');

bodyParser.urlencoded({extended: true});
app.use(bodyParser.json());
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', router)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});