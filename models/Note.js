
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var noteSchema = new Schema({
  
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  
  date: String,
  
  noteText: String
});


var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;
