//npm packages that actually perform the scraping
var request = require("request");
var cheerio = require("cheerio");

//scrape function makes a request to ny times, cheerio loads the body of text
//for each theme summary, grab story heading and summary
// if head and sum exist, clean up the text  and push the new data to the articles array
//callback function sends the articles
var scrape = function(cb) {

        request("http://www.nytimes.com", function(err, res, body) {

                var $ = cheerio.load(body);

                var articles = [];

                $(".theme-summary").each(function(i, element) {

                        var head = $(this).children(".story-heading").text().trim();
                        var sum = $(this).children(".summary").text().trim();

                        if (head && summ) {
                            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
                            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
                                var dataToAdd = {
                                    headLine: headNeat,
                                    summary: sumNeat
                                };

                                articles.push(dataToAdd);
                            }
                        });
                        cb(articles);
        });

};
//export scrape.js to be used throughout the program
 module.exports = scrape;