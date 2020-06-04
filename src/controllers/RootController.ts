import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('Not pemitted');
};

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        Logged in 
        <a href="/auth/logout"> Log Out </a>
      `);
    } else {
      res.send(`
        Not logged in 
        <a href="/auth/login"> Login </a>
      `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to classified area! ');
  }
}
