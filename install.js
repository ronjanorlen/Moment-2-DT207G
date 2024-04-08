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

// Hittepå data som finns från början
client.query(`
INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES
('Testföretag', 'Testare', 'Testgatan', '2024-04-01', '2024-04-02', 'Testade lägga in data och skapa API:er'),
('Hundfixarn', 'Promenixare', 'Åre', '2024-01-10', '2024-02-10', 'Tog långa promenader med hundar')
`, (err, res) => {
    if (err) {
        console.log("Fel vid inmatning: " + err);
    } else {
        console.log("Hittepå-data tillagt i databasen");
    }
});