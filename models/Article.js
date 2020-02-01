const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },

    summary: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },

    link: {
        type: String,
        required: true
    },
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;