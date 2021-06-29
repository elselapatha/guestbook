import dotenv from 'dotenv-flow';
dotenv.config({ node_env: process.env.NODE_ENV || 'development' });

export default {
  mongodb: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  server: {
    hostname: process.env.LOCAL_HOST | 'localhost',
    port: process.env.PORT,
  },
  secret: 'delenta-assignment',
};
