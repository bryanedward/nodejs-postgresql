const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    user: process.env.User,
    host: process.env.Host,
    database: process.env.Database,
    password: process.env.Password
};
