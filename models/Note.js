//require mongoose npm package
var mongoose = require("mongoose");
//create mongoose schema with the mongoose-schema function
var Schema = mongoose.Schema;

// create new schema with headlineId is the article for which we attach a note, the date string, notes as a string
var noteSchema = new Schema ({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});

//export note model for use through the program
var Note = mongoose.model("Note", noteSchema);
module.exports = Note;
