const { Client } = require("pg");
require("dotenv").config();

// Ansluter till databasen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

// Felhantering
client.connect((err) => {
    if (err) console.log("Fel vid anslutning" + err);
    else console.log("Ansluten till databasen...");
});

// Skapar tabell 'workexperience'
client.query(`
    DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience (
        id          SERIAL PRIMARY KEY,
        companyname VARCHAR(255) NOT NULL,
        jobtitle    VARCHAR(255) NOT NULL,
        location    VARCHAR(255) NOT NULL,
        startdate   DATE NOT NULL,
        enddate     DATE,
        description VARCHAR(255)
    )
`);