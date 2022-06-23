const Pool = require('pg').Pool

const pool = new Pool({
    connectionString: 'postgres://ebhlymiyhxgstc:9aa83e6c0b992dad4c1316989d5dd47623ef123b74a2382b675692b5032cdb0a@ec2-23-23-151-191.compute-1.amazonaws.com:5432/d597foscs8nk29',
    ssl: true
})

module.exports = pool