const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    user: process.env.USERW,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    key: process.env.KEY
};
