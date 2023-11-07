import { Strategy } from "passport-local";

export const LocalStrategy = new Strategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username: string, password: string, done) => {
    try {
      const user = { username, password };

      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
