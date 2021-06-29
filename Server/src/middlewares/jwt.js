import configs from '../configs';
import expressJwt from 'express-jwt';
import UserService from '../services/user.service';

export default function jwt() {
  const secret = configs.secret;
  return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
    path: ['/login', '/signup'],
  });
}

async function isRevoked(req, payload, done) {
  const user = await new UserService().getById(payload.sub);

  if (!user) {
    return done(null, true);
  }
  done();
}
