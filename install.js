/* Install-script */

const { Client } = require("pg");
require("dotenv").config();

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

// Skapa tabell
client.query(` 
DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience(
        id SERIAL PRIMARY KEY,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL,
        description TEXT NOT NULL
    )
`);