const debug = 0;

module.exports = {
  development: {
    client: 'pg',
    version: '7.2',
    connection: {
      host: 'sapien.coizuvfbjtc2.us-east-1.rds.amazonaws.com',
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
  }
};
