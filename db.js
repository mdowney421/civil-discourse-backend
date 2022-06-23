const Pool = require('pg').Pool

const pool = new Pool({
    user: 'matthewdowney',
    password: '',
    host: DATABASE_URL,
    port: 5432,
    database: 'civil_discourse'
})

module.exports = pool