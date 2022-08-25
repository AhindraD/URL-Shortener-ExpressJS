//const pool = require("pg").Client;
require("dotenv").config();

///*
const pool = require("pg").Pool;
const dbPool = new pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "shortit",
    password: "986619",
    port: 5432,
})
//*/

//postgres://username:password@hostname/databasename
//"postgres://qtzgxwtg:3TGqFfu27HMRimQI4Nb_V0qCoVnWAUl4@tyke.db.elephantsql.com/qtzgxwtg"

//const dbPool = new pool(process.env.URL);

module.exports = dbPool;