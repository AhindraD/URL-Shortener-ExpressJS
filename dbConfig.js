//const pool = require("pg").Client;
require("dotenv").config();

///*
const pool = require("pg").Pool;
const dbPool = new pool({
    user: "qtzgxwtg",
    host: "tyke.db.elephantsql.com",
    database: "qtzgxwtg",
    password: "3TGqFfu27HMRimQI4Nb_V0qCoVnWAUl4",
    port: 5432,
})
//*/

//postgres://username:password@hostname/databasename
//"postgres://qtzgxwtg:3TGqFfu27HMRimQI4Nb_V0qCoVnWAUl4@tyke.db.elephantsql.com/qtzgxwtg"

//const dbPool = new pool(process.env.URL);

module.exports = dbPool;