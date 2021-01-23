const { Pool } = require('pg');
// const pg = require('pg');

const dotenv = require('dotenv');

dotenv.config();

// const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_URL
// })

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  });

pool.on('connect', ()=>{
    console.log('connected to the db');
});

// connection using created pool
// pool.connect(function(err, client, done) {
//     client.query(/* etc, etc */)
//     done()
//   })

const createReflectionTable = () =>{
    const queryText = `CREATE TABLE IF NOT EXISTS
    reflections(
      id UUID PRIMARY KEY,
      success TEXT NOT NULL,
      low_point TEXT NOT NULL,
      take_away TEXT NOT NULL,
      owner_id UUID NOT NULL,
      created_date TIMESTAMP,
      modified_date TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
    )`;

    pool.query(queryText).then((res)=>{
        console.log(res.rows[0]);
        pool.end();
    }).catch((err)=>{
        console.log(err);
        pool.end();
    })
}

/**
 * Create User Table
 */
const createUserTable = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          email VARCHAR(128) UNIQUE NOT NULL,
          password VARCHAR(128) NOT NULL,
          created_date TIMESTAMP,
          modified_date TIMESTAMP
        )`;
  
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }

  /**
   * Create All Tables
   */
  const createAllTables = () => {
    createUserTable();
    createReflectionTable();
  }

/**
 * Drop Tables
 */

 const dropReflectionTable = () =>{
    const queryText = 'DROP TABLE IF EXISTS reflections';
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
 }
 pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

/**
 * Drop User Table
 */
const dropUserTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }
  /**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUserTable();
    dropReflectionTable();
  }
  
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

  module.exports = {
    createReflectionTable,
    createUserTable,
    createAllTables,
    dropUserTable,
    dropReflectionTable,
    dropAllTables
  };

  
  
  require('make-runnable');