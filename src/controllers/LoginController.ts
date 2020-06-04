import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  // @use()
  getLogin(req: Request, res: Response) {
    res.send(`
      <form method="POST">
        <div> 
          <label> Email </label>
          <input name="email" />
        </div>
        <div> 
          <label> Password </label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (
      email &&
      password &&
      email === 'test@email.com' &&
      password === 'password'
    ) {
      if (req.session) {
        req.session.loggedIn = true;
      }

      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    if (req.session) {
      req.session.loggedIn = false;
      res.redirect('/');
    }
  }
}
