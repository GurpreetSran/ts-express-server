import express from 'express';

import bodyParser from 'body-parser';
import cookiesSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookiesSession({ keys: ['sdjfhsdkfl'] }));

app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('listening on 3000!');
});
