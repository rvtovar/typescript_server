import { Router, Request, Response } from 'express';
import path from 'path';
const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../views/form.html'));
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.send(email.toUpperCase());
});

export { router };
