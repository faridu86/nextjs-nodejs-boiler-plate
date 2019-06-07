import express from 'express';
import user from '../controllers/user';

const Router = express.Router();

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(403).send({
    message: 'not authenticated',
  });
};

Router.get('/', (req, res) => res.status(200).send({ message: 'Welcome' }));

Router.get('/authenticated', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send({
      isAuthenticated: true,
    });
  }

  return res.status(403).send({
    isAuthenticated: false,
  });
});

Router.post('/signup', user.create);
Router.post('/login', user.auth);
Router.post('/logout', authMiddleware, user.logout);
Router.get('/user-context', authMiddleware, user.userContext);

Router.get('/users', user.list);

module.exports = Router;
