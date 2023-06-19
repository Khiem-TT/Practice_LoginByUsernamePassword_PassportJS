import passport from "../middlewares/passport";

export class GeneralController {
    static async login(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send('Wrong email or password');
            }
            req.login(user, () => {
                res.send('You are authenticated');
            })
        })(req, res, next)
    }
}