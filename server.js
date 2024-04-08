/* Server-applikation */

const { Client } = require("pg");
const express = require("express");
require("dotenv").config();


const app = express(); // Starta applikationen
app.set("view engine", "ejs"); // View-engine
app.use(express.static("public")); // Statiska filer
app.use(express.urlencoded({ extended: true })); // Aktivera formulärdata

/* Anslut till databas, läs in från env-fil */
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect((err) => {
    if (err) {
        console.log("Fel vid anslutning" + err);
    } else {
        console.log("Ansluten till databas!");
    }
});


/* Routing */
app.get("/", async (req, res) => {
    // Läs ut från databasen, sortera på startdatum
    client.query("SELECT * FROM workexperience ORDER BY startdate DESC", (err, result) => {
        if(err) {
            console.log("Fel vid db-fråga");
        } else {
            res.render("index", {
                jobs: result.rows // Lagra alla rader i variabel jobs, skicka till vyn
            });
        }
    });
});

// Ta input från formulär och lagra i databasen
app.post("/", async (req, res) => {
    const companyname = req.body.companyname;
    const jobtitle = req.body.jobtitle;
    const location = req.body.location;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const description = req.body.description;

    // SQL-fråga
    const result = await client.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate, description)VALUES($1, $2, $3, $4, $5, $6)",
        [companyname, jobtitle, location, startdate, enddate, description]
    );

    res.redirect("/"); // Gå tillbaks till startsidan
});



/* Starta servern */
app.listen(process.env.PORT, () => {
    console.log("Servern startad på port: " + process.env.PORT);
});