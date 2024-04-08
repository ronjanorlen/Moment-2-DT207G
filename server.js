const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route - GET
app.get("/api", (req, res) => {
    res.json({message: "Välkommen till mitt API"});
});

app.get("/api/workexperience", (req, res) => {
    res.json({message: "Hämta jobb"});
});

// Route - POST
app.post("/api/workexperience", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    // Felhantering
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        // Felmeddelande
        errors.message = "Uppgifter saknas";
        errors.detail = "Du måste fylla i alla uppgifter";

        // Responskod
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);
        

        return; // Kör inte vidare om fel
    }

    let job = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    };

    res.json({message: "Jobb tillagt", job});
});

// Route - PUT
app.put("/api/workexperience/:id", (req, res) => {
    res.json({message: "Jobb uppdaterat" + req.params.id});
});

// Route - DELETE
app.delete("/api/workexperience/:id", (req, res) => {
    res.json({message: "Jobb raderat " + req.params.id});
});



app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});

/* Server-applikation 
const { Client } = require("pg");
const express = require("express");
require("dotenv").config(); */

/*
const app = express(); // Starta applikationen
app.set("view engine", "ejs"); // View-engine
app.use(express.static("public")); // Statiska filer
app.use(express.urlencoded({ extended: true })); // Aktivera formulärdata
*/

/* Anslut till databas, läs in från env-fil 
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
/* app.get("/", async (req, res) => {
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
*/

/* Ta input från formulär och lagra i databasen
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



/* Starta servern 
app.listen(process.env.PORT, () => {
    console.log("Servern startad på port: " + process.env.PORT);
}); */