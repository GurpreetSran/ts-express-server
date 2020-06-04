import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not pemitted');
};

const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      Logged in 
      <a href="/logout"> Log Out </a>
    `);
  } else {
    res.send(`
      Not logged in 
      <a href="/login"> Login </a>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.loggedIn = false;
    res.redirect('/');
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to classified area! ');
});

export { router };
