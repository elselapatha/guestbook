import jwt from 'jsonwebtoken';
import configs from '../configs';
export default class AuthService {
  generateToken(id) {
    return jwt.sign({ sub: id }, configs.secret, {
      expiresIn: '7d',
    });
  }
}
