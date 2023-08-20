import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "432913184690-kuj801g78tcv3fj6jgkldlf8i3lqre1k.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4000/api/v1/login",
      },
      async function (accessToken, refreshToken, profile, done) {
        const user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });

          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
