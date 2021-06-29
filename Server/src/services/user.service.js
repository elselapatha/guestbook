import User from '../models/user.model';
import bcrypt from 'bcrypt';

export default class UserService {
  async login(email, password) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
      return {
        name: user.name,
        id: user._id,
      };
    } else throw new Error('Invalid Password!');
  }

  async register(name, email, password) {
    if (await User.findOne({ email })) {
      throw 'Username "' + email + '" is already taken';
    }

    const user = new User({ name, email });

    if (password) {
      user.hash = bcrypt.hashSync(password, 10);
    }
    const createdUser = await user.save();
    return { name, id: createdUser._id };
  }

  async getById(id) {
    return await User.findById(id).select('_id').lean();
  }
}
