import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { get, controller, bodyValidator, post } from './decorators';

@controller('/auth')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    console.log('test');
    res.sendFile(path.join(__dirname, '../../views/form.html'));
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email == 'rose@mail.com' && password == 'waffles') {
      // mark this person as logged in
      req.session = {
        loggedIn: true,
      };

      //redirect them to root route

      res.redirect('/');
    } else {
      res.send('Invalid Email or Password');
    }
  }
  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
