import { Request, Response } from 'express';
import path from 'path';
import { get, controller, use } from './decorators';
import { requireAuth } from '../auth/middleware';
@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.sendFile(path.join(__dirname, '../../views/loggedIn.html'));
    } else {
      res.sendFile(path.join(__dirname, '../../views/loggedOut.html'));
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '../../views/protected.html'));
  }
}
