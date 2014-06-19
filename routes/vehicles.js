var express = require('express');
var router = express.Router();

/* GET users listing. */


module.exports = function(app){
  var Vehicle;
  
  function setModel(){
    Vehicle = Vehicle || app.get('Vehicle');
  }

  router.get('/', function(req, res) {
    setModel();
    var findObj = {};
    if(!!req.query.where){
      try {
        findObj = JSON.parse(req.query.where);
      } catch(e){
        return res.send(500, "Invalid Query parameter");
      }
    }

    var query = Vehicle.find(findObj);

    if(!!req.query.skip){
      query = query.skip(parseInt(req.query.skip));
    }

    if(!!req.query.limit){
      query = query.limit(parseInt(req.query.limit));
    }

    if(!!req.query.sort){
      query = query.sort(JSON.parse(req.query.sort));
    }

    query.then(res.send.bind(res));
  });

  router.get('/:id', function(req, res) {
    setModel();
    //var Vehicle = app.get('Vehicle');
    Vehicle.findOne({id:req.params.id}).then(res.send.bind(res));
  });

  return router;
};
