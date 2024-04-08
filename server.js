/* Server-applikation */

const { Client } = require("pg");
const express = require("express");
require("dotenv").config();


const app = express(); // Starta applikationen
app.set("view engine", "ejs"); // View-engine
app.use(express.static("public")); // Statiska filer
app.use(express.urlencoded( { extended: true })); // Aktivera formulärdata

// Anslut till databas, läs in från env-fil
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
    if(err) {
        console.log("Fel vid anslutning" + err);
    } else {
        console.log("Ansluten till databas!");
    }
});


// Routing
app.get("/", async(req, res) => {
    res.render("index");
});

// Starta servern
app.listen(process.env.PORT, () => {
    console.log("Servern startad på port: " + process.env.PORT);
})