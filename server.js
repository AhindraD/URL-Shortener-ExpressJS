const express = require('express');
const morgan = require('morgan');
const { nanoid } = require('nanoid');
const dbPool = require("./dbConfig");

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    dbPool.query("SELECT NOW()", async (err, rows) => {
        try { console.log(rows); }
        catch { console.log(err); }
    })
    response.render("index");
})

let BASE_URL = '';
app.post("/shortit", async (request, response) => {
    const { inputUrl } = request.body;
    console.log(inputUrl);

    BASE_URL = request.protocol + '://' + request.get('host') + '/';//+ request.originalUrl;
    let newUrl = BASE_URL + nanoid(13); //=> "V1StGXR8_Z5jdHi6B-myT"

    const text = 'INSERT INTO urls(original, shorten) VALUES($1, $2) RETURNING *';
    const values = [inputUrl, newUrl];
    // async/await
    try {
        const res = await dbPool.query(text, values)
        console.log(res.rows[0]);
    } catch (err) {
        console.log(err.stack)
    }
    return response.render("shorten", { inputUrl, newUrl });
})


app.get("/:id", async (request, response) => {
    let ID = request.params.id;
    BASE_URL = request.protocol + '://' + request.get('host') + '/';
    let newUrl = BASE_URL + ID;

    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'SELECT * FROM urls WHERE shorten = $1',//urls(original, shorten)
        values: [newUrl],
    }

    try {
        const res = await dbPool.query(query)
        const link = await res.rows[0].original;
        const dbID = await res.rows[0].id;
        let tillVisits = await res.rows[0].visits;

        const updateQuery = {
            name: "update visitor count",
            text: `UPDATE urls SET visits = $2 WHERE id = $1`,
            values: [dbID, (tillVisits + 1)],
        }
        await dbPool.query(updateQuery)

        return response.redirect(link)
    } catch (err) {
        console.log(err.stack)
    }
})


process.on("exit", async () => {
    await dbPool.end();
})

app.listen(process.env.PORT || 8000);