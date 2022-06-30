import express, { Request, Response } from 'express';
import { AppRouter } from './AppRouter';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
// import { router as loginRouter } from './controllers/decorators/controller';

import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cookieSession({
    keys: ['wldoahdIkdk'],
  })
);
app.use(AppRouter.router);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
