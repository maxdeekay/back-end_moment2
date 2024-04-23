const { Client } = require("pg");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
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

client.connect((err) => {
    (err) ? console.log("Fel vid anslutning" + err) : console.log("Ansluten till databasen...");
});

// ROUTING
// Read from database
app.get("/api/experience", (req, res) => {
    client.query("SELECT * FROM workexperience ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json({error: "Something went wrong: " + err});
    
        if (result.rows.length === 0) {
            res.status(404).json({message: "No work experiences found."});
        } else {
            res.json(result.rows);
        }
    });
});

// Add to database
app.post("/api/experience", (req, res) => {
    const {companyname, jobtitle, location, startdate, enddate, description} = req.body;
    console.log(companyname);
    // Error handling
    if (!companyname || !jobtitle || !location || !startdate) {
        return res.status(400).json({
            message: "Missing required input.",
            details: "Company name, job title, location and start date must be included.",
        });
    }
    
    const isValidDate = (date) => !isNaN(new Date(date).getDate());

    // Date validation
    if (isValidDate(startdate) && (!enddate || isValidDate(enddate))) {
        // Add work experience
        client.query(`
            INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [companyname, jobtitle, location, startdate, enddate, description], (err, result) => {
        if (err) return res.status(500).json({error: "Unexpected " + err});

        res.json({message: "Experience added", experience: result.rows[0]});
    }); 
    } else {
        return res.status(400).json({message: "Invalid date format"});
    }
});

// Update in database -- ANVÄNDS INTE
app.put("/api/experience", (req, res) => {
    const {id, companyname, jobtitle, location, startdate, enddate, description} = req.body;

    // Error handling
    if (!companyname || !jobtitle || !location || !startdate) {
        return res.status(400).json({
            message: "Missing required input.",
            details: "Company name, job title, location and start date must be included.",
        });
    }

    // Update work experience
    client.query(`
        UPDATE workexperience
        SET (companyname, jobtitle, location, startdate, enddate, description) =
        ROW($1, $2, $3, $4, $5, $6)
        WHERE id = $7
    `, [companyname, jobtitle, location, startdate, enddate, description, id], (err, result) => {
        if (err) return res.status(500).json({error: "Something went wrong: " + err});

        res.json(result.rows[0]);
    });
});

// Delete from database
app.delete("/api/experience/:id", (req, res) => {
    client.query("DELETE FROM workexperience WHERE id=$1", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({error: "Unexpected " + err});

        if (result.rowCount === 0) {
            return res.status(404).json({error: "Experience not found for ID: " + req.params.id});
        }

        res.json({message: "Experience deleted: " + req.params.id});
    });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log("Server is running on port: " + process.env.PORT);
});