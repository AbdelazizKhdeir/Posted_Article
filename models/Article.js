const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  DateOfArticle: {
    type: Date,
    default: Date.now 
  }
});

const Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;
