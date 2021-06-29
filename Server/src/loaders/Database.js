import { connect, connection } from 'mongoose';

export default class Database {
  #username;
  #password;
  constructor(username, password) {
    this.#username = username;
    this.#password = password;
    connection.on('connected', () =>
      console.log('------------------> Database connected successfully!')
    );
    connection.on('disconnect', () =>
      console.log('------------------> Database disconnected!')
    );
  }
  async connect() {
    try {
      await connect(
        `mongodb+srv://${this.#username}:${
          this.#password
        }@development.sky4s.mongodb.net/mean?retryWrites=true&w=majority`,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
