import expressSession from 'cookie-session';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';

import { session } from '../../config/config';

const getUserProps = user => ({
  id: user.id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

module.exports = (app, passport) => {
  const newExpressSession = expressSession({
    secret: session.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 600000,
    },
  });

  app.use(newExpressSession);
  app.use(passport.initialize());
  app.use(passport.session());

  const newLocalStrategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    session: true,
  };

  const newLocalStrategy = new Strategy(
    newLocalStrategyOptions,
    // eslint-disable-next-line consistent-return
    async (username, password, done) => {
      try {
        const user = await global.db.User.findOne({
          where: {
            username,
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'Incorrect credentials.',
          });
        }

        const hashed = bcrypt.hashSync(password, user.salt);
        if (user.password === hashed) {
          return done(null, user);
        }

        return done(null, false, {
          message: 'Incorrect credentials.',
        });
      } catch (err) {
        done(null, false, {
          message: 'Failed',
        });
      }
    },
  );

  passport.use(newLocalStrategy);

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await global.db.User.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return done(null, false, { message: 'User does not exist' });
      }

      return done(null, getUserProps(user));
    } catch (err) {
      return done(null, false, { message: 'Failed' });
    }
  });
};
