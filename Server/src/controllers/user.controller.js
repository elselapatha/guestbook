import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await new UserService().login(username, password);
    const token = new AuthService().generateToken(user.id);
    res.send({ name: user.name, token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function signup(req, res, next) {
  try {
    const { username, password, name } = req.body;
    const user = await new UserService().register(name, username, password);
    const token = new AuthService().generateToken(user.id);

    res.send({ name: user.name, token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
