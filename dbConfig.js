const pool = require("pg").Pool;

const dbPool = new pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "shortit",
    password: "986619",
    port: 5432,
})

module.exports = dbPool;