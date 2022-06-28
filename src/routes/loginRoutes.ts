import { Router, Request, Response } from 'express';
import path from 'path';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../views/form.html'));
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email) {
    res.send(email.toUpperCase());
  } else {
    res.status(422).send('You Must provide an email');
  }
});

export { router };
