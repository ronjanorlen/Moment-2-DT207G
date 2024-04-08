const express = require('express');
const cors = require('cors');
const { Client } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

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
    if (err) {
        console.log("Fel vid anslutning" + err);
    } else {
        console.log("Ansluten till databas!");
    }
});

app.use(cors());
app.use(express.json());

// Route - GET
app.get("/api", (req, res) => {
    res.json({message: "Välkommen till mitt API"});
});

app.get("/api/workexperience", (req, res) => {
    // Hämta arbetserfarenheter
    client.query(`SELECT * FROM workexperience;`, (err, results) => {
        if(err) {
            res.status(500).json({error: "Något blev fel: " + err});
            return;
        }
        
        if(results.length === 0) {
            res.status(404).json({message: "Inga arbetserfarenheter hittade"});
        } else {
            res.json(results.rows);
        }
    });

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

