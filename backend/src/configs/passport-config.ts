import { Request } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import config from './env-config';
import { NotFoundException } from '../utils/appErr-util';
import { ProviderEnum } from '../enums/provider-enum';
import loginOrCreateUserService from '../services/auth/loginOrCreateUser-service';
import verifyUserService from '../services/auth/verifyUser-service';

passport.use(
   new LocalStrategy({
      usernameField: "email",
      passwordField: "password",
      session: true,
   },
   async (email, password, done) => {
      try {
         const user = await verifyUserService({ email, password });
         return done(null, user);
      } catch (err: any) {
         return done(err, false, { message: err?.message });
      }
   }
));

passport.use(
   new GoogleStrategy({
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
   },
   async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
         const { email, sub: googleId, picture } = profile._json;
         console.log("Google profile: ", profile);
         if (!googleId) {
            throw new NotFoundException("Google ID not found in profile");
         }

         const { user } = await loginOrCreateUserService({
            provider: ProviderEnum.GOOGLE,
            displayName: profile.displayName,
            providerId: googleId,
            picture: picture,
            email: email,
         })

         done(null, user);
      } catch (err: any) {
         done(err as Error, false);
      }
   }
));

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));
