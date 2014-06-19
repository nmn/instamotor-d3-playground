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
    Vehicle.find().then(res.send.bind(res));
  });

  router.get('/:id', function(req, res) {
    setModel();
    Vehicle.findOne({id:req.params.id}).then(res.send.bind(res));
  });

  return router;
};
