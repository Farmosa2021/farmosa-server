const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'db',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '123',
    database: env.DB_NAME || 'farmosa_db'
  }
};

module.exports = config;
