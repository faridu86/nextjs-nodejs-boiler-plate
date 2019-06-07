import bcrypt from 'bcrypt';
import passport from 'passport';

const isEmptyOrNull = string => !string || !string.trim();

const getUserProps = user => ({
  id: user.id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

module.exports.create = async (req, res) => {
  const { username, password, verify } = req.body;

  if (isEmptyOrNull(username) || isEmptyOrNull(password) || isEmptyOrNull(verify)) {
    return res.status(500).send({
      message: 'Please fill out all fields.',
    });
  }

  if (password !== verify) {
    return res.status(500).send({
      message: 'Your passwords do not match.',
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const user = await global.db.User.create({
      username: username.toLowerCase(),
      salt,
      password: hash,
    });

    return req.login(user, (err) => {
      if (!err) {
        return res.status(200).send(getUserProps(user));
      }

      return res.status(500).send({
        message: 'Auth error',
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.auth = (req, res) => {
// eslint-disable-next-line consistent-return
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).send({
        message: '500: Authentication failed, try again.',
      });
    }

    if (!user) {
      return res.status(404).send({
        message: '404: Authentication failed, try again.',
      });
    }

    req.login(user, (e) => {
      if (!e) {
        res.status(200).send(getUserProps(user));
      }
    });
  })(req, res);
};

module.exports.userContext = async (req, res) => {
  const user = await global.db.User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).send({
      message: '404 on user get',
    });
  }

  return res.status(200).send(getUserProps(user));
};

module.exports.logout = (req, res) => {
  req.logout();
  return res.status(200).send({
    message: 'You are successfully logged out',
  });
};

module.exports.list = async (req, res) => {
  const users = await global.db.User.findAll();

  return res.status(200).send(users);
};

module.exports.get = async (req, res) => {
  const user = await global.db.User.findByPk(req.params.userId);

  if (!user) {
    return res.status(404).send({
      message: '404 on user get',
    });
  }

  return res.status(200).send(getUserProps(user));
};

module.exports.update = async (req, res) => {
  if (isEmptyOrNull(req.body.password)) {
    return res.status(500).send({
      message: 'You must provide a password.',
    });
  }

  const user = await global.db.User.findByPk(req.params.userId);

  if (!user) {
    return res.status(404).send({
      message: '404 no user on update',
    });
  }

  const updatedUser = await user.update({
    email: req.body.email || user.email,
    username: req.body.username || user.username,
    password: req.body.password || user.password,
  });

  return res.status(200).send(getUserProps(updatedUser));
};

module.exports.deleteViewer = async (req, res) => {
  const user = await global.db.User.findByPk(req.user.id);

  if (!user) {
    return res.status(403).send({
      message: 'Forbidden: User Not Found',
    });
  }

  req.logout();
  await user.destroy();

  return res.status(200).send({
    viewer: null,
  });
};
