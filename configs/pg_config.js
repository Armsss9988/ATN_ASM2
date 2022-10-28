const { Pool } = require('pg')
const pg_conn = new Pool({
    user: 'wizdjijslbmyqo',
    host: 'ec2-34-230-153-41.compute-1.amazonaws.com',
    database: 'dd6ojqq5h1ibc0',
    password: '0a4ae49fde934d1fabec29251c812ab338010fa21f8dbcd57f0baf76b14e2f7e',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
  })
  module.exports = pg_conn;