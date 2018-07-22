module.exports = function(router){
// this route renders the homepage: home.handlebars
  router.get("/", function(req, res){
      res.render("home");
  });
//this route renders the saved handlebars page : saved.handlebars
  router.get("/saved", function(req, res){
    res.render("saved");
  });

router.get("/api/fetch", function(req,res){
    headlinesController.fetch(function(err,docs){
        if(!docs || docs.insertedCount === 0){
            res.json({
                message: "No new articles. Check again later "
            });
        }
        else {
            res.json({
                message: "Added" + docs.insteredCount + "new Articles!"
            });
        }


    });
  });

  router.get("/api/headlines", function(req, res){
    var query = {};
    if (req.query.saved){
        query = req.query;
    }

    headlinesController.get(query, function(data){
        res.json(data);
    });
  });

  router.delete("/api/headlines/:id", function(req, res){
    var query = {};
    query.id = req.params.id;
    headlinesController.delete(query, function(err, data){
        res.json(data);
    });
  });
//runs and update function on what the user sends with their request
  router.patch("/api/headlines", function(req, res){
    headlinesController.update(req.body, function(err, data){
        res.json(data);
     });
  });

}