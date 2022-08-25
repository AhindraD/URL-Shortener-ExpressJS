const pool = require("pg").Client;
require("dotenv").config();

// const dbPool = new pool({
//     user: "postgres",
//     host: "127.0.0.1",
//     database: "shortit",
//     password: "986619",
//     port: 5432,
// })

const dbPool=new pool(process.env.URL);

module.exports = dbPool;