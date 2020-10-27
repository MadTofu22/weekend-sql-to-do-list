const pg = require('pg');

// Setup PG to connect to DB
const Pool = pg.Pool;
const pool = new Pool ({
    database: 'da26smnnj4j2tg',
    host: 'ec2-54-160-18-230.compute-1.amazonaws.com', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
});

pool.on('connect', () => {
    console.log('Postgresql Connected');
});

pool.on('error', error => {
    console.log('Error With Postgresql Pool', error);
});

module.exports = pool;