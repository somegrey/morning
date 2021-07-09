var mongoose = require('./connection.js');

var articleSchema = mongoose.Schema({
   title: String,
   description: String,
   content: String,
   image: String, 
   url: String,
   lang: String 
});

var articleModel = mongoose.model('articles', articleSchema);

module.exports = articleModel;