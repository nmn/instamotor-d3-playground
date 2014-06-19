var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var Promise = require('bluebird');
var orm = new Waterline();

orm = Promise.promisifyAll(orm);

var config = {

  // Setup Adapters
  // Creates named adapters that have have been required
  adapters: {
    'default': mysqlAdapter,
    mysql: mysqlAdapter
  },

  // Build Connections Config
  // Setup connections using the named adapter configs
  connections: {
    myLocalMySql: {
      adapter: 'mysql',
      host: 'localhost',
      database: 'instamotors_services',
      user: 'root'
    }
  }

};

var Vehicle = Waterline.Collection.extend({

  identity: 'vehicle',
  connection: 'myLocalMySql',

  attributes: {
    first_name: 'string',
    last_name: 'string'
  }
});

orm.loadCollection(Vehicle);

module.exports = function(callback){

  var x = orm.initializeAsync(config); // a promise with models -> models.collections, models.connections

  // Making File work with Callbacks Or Promises.
  if(typeof callback === 'function'){
    x.then(callback.bind(this, null)).catch(callback);
  } else {
    return x;
  }

};

