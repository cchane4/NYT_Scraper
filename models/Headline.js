//require mongoose npm package
var mongoose = require("mongoose");

//creating the mongoose schema using the mongoose-Schema function
var Schema = mongoose.Schema;

/*creates a new Schema requires a headline and a unique summary, the date is a string and
a saved variable the default to false will change to true if the user decides to save that articl*/
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
    date: String,
    saved: {
        type: Boolean,
        default: false
    }

});

//export Headline model for use throughout the program
var Headline = mongoose.model("Headline", headlineSchema);
module.exports = Headline;