const Pool = require('pg').Pool
require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

module.exports = pool