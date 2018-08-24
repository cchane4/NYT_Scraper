
var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var headlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  
  url: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: false
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  }
});

var Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;
