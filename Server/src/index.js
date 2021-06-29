import ExpressServer from './loaders/ExpressServer';
import Database from './loaders/Database';
import router from './router/routes';
import configs from './configs';

const WebServer = new ExpressServer(
  configs.server.hostname,
  configs.server.port
);
new Database(configs.mongodb.username, configs.mongodb.password)
  .connect()
  .then(() => WebServer.initServer(router));
