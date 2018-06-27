module.exports = function(router){
// this route renders the homepage: home.handlebars
  router.get("/", function(req, res){
      res.render("home");
  });
//this route renders the saved handlebars page : saved.handlebars
  router.get("/saved", function(req, res){
    res.render("saved");
  });
}