import { Router } from 'express';
import {
  getByUser,
  patch,
  post,
  remove,
} from '../controllers/record.controller';
import { login, signup } from '../controllers/user.controller';
import validator from '../middlewares/validator';
import * as record from '../utils/validators/record.schema';
import * as user from '../utils/validators/user.schema';

const router = new Router();

router.post('/login', validator(user), login);
router.post('/signup', validator(user), signup);

router.get('/records', getByUser);
router.post('/records', validator({ body: record.body }), post);
router.patch('/records/:id', validator(record), patch);
router.delete('/records/:id', validator({ path: record.path }), remove);

router.get('/user', (req, res) => {
  res.send('Got a GET request at /user');
  next();
});

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;
