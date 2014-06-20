var React = require('react');
var search = require('./../ReactComponents/search');

var x = React.createClass({
  render: function(){
    return React.DOM.div({}, 'something');
  }
});

module.exports = function(req, res) {
  res.render('index', { 
    title: 'Instamotor', // Only for the page title
    ReactComponent: React.renderComponentToString(search({title: 'Instamotor'}))
  });
};