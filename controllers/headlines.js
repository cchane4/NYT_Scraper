//import scrape and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");
//import Headline and Note models
var Headline = require("../models/Headline");
// for use throughout the program
//
module.exports = {

//fetch passes the callback, runs a scrape, data will be called articles
// set the date and set save to false on each/all of the articles

    fetch: function(cb){
        scrape(function(data){
            var articles = data;
            for (var i=0; i < articles.length; i++){
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
//NOTE: this is a mongo function: puts all he in the Headline collection of mongo database
// order isnt necessary and if we catch an error in an article the process continues
// the callback returns error in the docs
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err, docs);
            });
        });
    },
//delete function will run and removes articles
    delete: function(query,cb){
        Headline.remove(query,cb);
    },

//find all headlines in query sort most recent to least, then pass docs to callback function
    get: function(query, cb){
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err,doc){
            cb(doc);
        });
    },
// update new scraped articles with relevant id and any info pass to the articles
    update: function(query, cb){
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}