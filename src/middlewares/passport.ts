import passport from "passport";
import {UserModel} from "../models/schemas/user.model";
import LocalStrategy from "passport-local";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await UserModel.findOne({username});
    if (!user) {
        return done(null, false);
    } else {
        if (user.password === password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
}));

export default passport;