import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import { requireAuth } from '../auth/middleware';
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../views/form.html'));
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email == 'rose@mail.com' && password == 'waffles') {
    // mark this person as logged in
    req.session = {
      loggedIn: true,
    };

    //redirect them to root route

    res.redirect('/');
  } else {
    res.send('Invalid Email or Password');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.sendFile(path.join(__dirname, '../../views/loggedIn.html'));
  } else {
    res.sendFile(path.join(__dirname, '../../views/loggedOut.html'));
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../views/protected.html'));
});

export { router };
