//import the Note script and makeDate module
var Note = require("../models/Note");
var makeDate = require("../scripts/date");

//NOTE: fetch isn't used bc we arent scraping for data
//finds all notes associated with headlineId in question
// save creates an object headlineid, date and noteText
module.exports = {
    get: function(data,cb){
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    save: function(data,cb){
        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
// takes the note and creates a new Note. if error console.log it
// if not the note is passed to the callback function
        Note.create(newNote, function (err , doc){
            if (err){
                console.log(err);
            }
            else{
                console.log(doc);
                cb(doc);
            }
        });
    },
//deletes the note
    delete: function(data,cb){
        Note.remove({
            _id: data._id
        }, cb);
    }
};