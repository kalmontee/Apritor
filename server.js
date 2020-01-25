const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models"); // Require all models
const PORT = 3000;
const app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // Make public a static folder

// Connect to mongoDB
mongoose.connect("mongod://localhost/unit18Populater", {
    useNewUrlParser: true
});

app.get("/scrape", (req, res) => {
    axios.get("#").then(response => {
        const $ = cheerio.load(response.data);

        // Here I will grab every information I need from whichever website I decide to scrape data from.

        // Need a Headline

        // Need Summary

        // Need link


        // Send a message to the client.
        res.send("Scrape Complete");
    });
});