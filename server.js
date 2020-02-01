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

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to mongoDB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

app.get("/scrape", (req, res) => {
    // Here I will grab every information I need from whichever website I decide to scrape data from.
    axios.get("http://techcrunch.com/europe/").then(response => {
        const $ = cheerio.load(response.data);

        $(".post-block h2").each((i, element) => {
            // Save an empty result object
            const result = {};

            // Need a Headline 
            result.headline = $(this).text();

            // Need Summary
            result.summary = $(this).children("div", "p").text();

            // Need link
            result.url = $(this).children("a").attr('href');

            db.Article.create(result)
                .then(dbArticle => console.log(dbArticle)) // View the added result in the console
                .catch(err => console.log(err)); // If an error occurred, log it);    
        });

        // Send a message to the client.
        res.send("Scrape Complete");
    });
});

// Route for getting all Articles from the db
app.get("/articles", (req, res) => {
    // Grab every document in the Articles collection
    db.Article.find({})
        // If we were able to successfully find Articles, send them back to the client
        .then(dbArticle => res.json(dbArticle))
        // If an error occurred, send it to the client
        .catch(err => res.json(err));
});

app.get("/articles/:id", (req, res) => {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(dbArticle => res.json(dbArticle)) // If we were able to successfully find an Article with the given id, send it back to the client
        .catch(err => res.json(err)); // If an error occurred, send it to the client
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", (req, res) => {
    db.Note.create(req.body)
        .then(dbNote => {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        // If we were able to successfully update an Article, send it back to the client
        .then(dbArticle => res.json(dbArticle))
        // If an error occurred, send it to the client
        .catch(err => res.json(err));
});

// Start the server
app.listen(PORT, () => console.log(`App running on port ${PORT}!`));