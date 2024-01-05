const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: true,
    // ssl: true,
    // define: {
    //   timestamps: false,
    // },
    // dialectOptions: {
    //   ssl: {
    //     // require: true,
    //     rejectUnauthorized: false
    //   },
    //   // keepAlive: true,
    // }
    // dialectOptions: {
    //   ssl: { require: true, rejectUnauthorized: false },
    //   keepAlive: true,
    // },
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
};
// 7.4.3
