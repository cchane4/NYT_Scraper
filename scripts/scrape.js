
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
  request("http://www.nytimes.com", function(err, res, body) {

    var $ = cheerio.load(body);

    var articles = [];

    $(".theme-summary").each(function(i, element) {

      var head = $(this).children(".story-heading").text().trim();

      var url = $(this).children(".story-heading").children("a").attr("href");
      console.log(url);

      var imgUrl = $(this).find("img").attr("src");
      console.log(imgUrl);

      var sum = $(this).children(".summary").text().trim();
      


      if (head && sum && url) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        


        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          
          imgUrl: imgUrl,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    cb(articles);
  });
};
console.log(scrape);
// Export the function, so other files in our backend can use it
module.exports = scrape;
