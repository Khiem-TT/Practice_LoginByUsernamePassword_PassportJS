import passport from "passport";
import {UserModel} from "../models/schemas/user.model";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import {request} from "express";

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
passport.use(new GoogleStrategy({
        clientID: '959089008601-2lhl6fmvgturqig1vds1ognd712c0rsf.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/auth/google/callback',
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile, 'profile');
            let existingUser = await UserModel.findOne({'google.id': profile.id});
            if (existingUser) {
                return done(null, existingUser);
            }
            console.log('Creating new user...');
            const newUser = new UserModel({
                username: profile.email[0].value,
                password: null,
                google: {
                    id: profile.id
                }
            });
            await newUser.save();
            console.log(newUser, 'newUser');
            return done(null, newUser);
        } catch (err) {
            return done(null, false);
        }
    }
))

export default passport;