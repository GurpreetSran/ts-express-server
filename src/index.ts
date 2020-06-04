import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookiesSession from 'cookie-session';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookiesSession({ keys: ['sdjfhsdkfl'] }));
app.use(router);

app.listen(3000, () => {
  console.log('listening on 3000!');
});
