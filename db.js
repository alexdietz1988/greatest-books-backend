require('dotenv').config()

const Pool = require('pg').Pool

const pool = new Pool({
    database: process.env.PGDATABASE
})

module.exports = pool