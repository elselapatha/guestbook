import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import jwt from '../middlewares/jwt';

export default class ExpressServer {
  constructor(hostname, port) {
    this.serverName = 'Guestbook Application';
    this.hostname = hostname;
    this.port = port;
  }

  initServer = (routes) => {
    //Create Server
    this.server = express();

    this.server.use(morgan('dev'));
    this.server.use(jwt());
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));

    if (routes) {
      this.server.use(routes);
    }

    //Start Listening
    this.server.listen(this.port, () => {
      console.log(
        `${this.serverName} Started at http://${this.hostname}:${this.port}/`
      );
    });
  };
}
