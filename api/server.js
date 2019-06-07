import express from 'express';
import next from 'next';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import setupAuth from './middleware/auth';
import setupApiRoutes from './routes';
import * as db from './models';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 8000;
const app = next({ dev, quiet: false });
// eslint-disable-next-line no-unused-vars
const nextRequestHandler = app.getRequestHandler();

global.db = db;

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use(compression());
  }

  server.use('/static', express.static(`${__dirname}/static `));
  server.use(cookieParser());
  server.use(morgan('dev'));
  server.use(cors({ credentials: true, origin: true }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  setupAuth(server, passport);
  server.use('/api', setupApiRoutes);

  server.get('*', async (req, res) => {
    const params = {};
    return app.render(req, res, req.url, params);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Running on localhost:${port}`);
  });
});
