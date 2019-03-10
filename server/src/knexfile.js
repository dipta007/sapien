const debug = 0;

module.exports = {
  development: {
    client: 'pg',
    version: '7.2',
    connection: {
      host: 'sapien.crffscfa8eeu.us-east-2.rds.amazonaws.com',
      user: 'dipta007',
      password: 'dipta007',
      database: 'sapien_test',
      timezone: 'UTC'
    },
    pool: {
      min: 1,
      max: 1
    },
    debug
  },
  production: {
    client: 'pg',
    version: '7.2',
    connection: {
      host: 'sapien.crffscfa8eeu.us-east-2.rds.amazonaws.com',
      user: 'dipta007',
      password: 'dipta007',
      database: 'sapien_test',
      timezone: 'UTC'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
