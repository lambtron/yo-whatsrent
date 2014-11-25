
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var Yo = require('../lib/yo');

/**
 * Define `Routes`.
 */

var Routes = {};

/**
 * Render index html page.
 */

Routes.index = function *index() {
  this.body = yield render('index');
};

/**
 * Get `yo` from user.
 */

Routes.getYo = function *getYo() {
  var username = this.request.query.username;
  var location = this.request.query.location;
  var lat = location.substring(0, location.indexOf(';'));
  var lng = location.substring(location.indexOf(';') + 1);
  var user = {
    username: username,
    location: [ parseFloat(lng), parseFloat(lat) ],
    lastSeenAt: new Date
  };
  var link = '';
  this.body = yield Yo.yo_link(username, link);
};

/**
 * Show rent prices of homes nearby.
 */

Routes.showRents = function *showRents() {
  var rents = objectToArray(this.request.query);
  if (rents.length === 0) return this.body = yield render('404');
  this.body = yield render('items', { items: rents });
};

/**
 * Show prices of homes nearby.
 */

Routes.showPrices = function *showPrices() {
  var prices = objectToArray(this.request.query);
  if (prices.length === 0) return this.body = yield render('404');
  this.body = yield render('items', { items: prices });
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;

/**
 * Private function to turn object to array.
 *
 * @param {Object} object
 *
 * @return {Array}
 */

function objectToArray(object) {
  var array = [];
  for (var prop in object) {
    var i = prop.charAt(prop.length - 1);
    var p = prop.slice(0, -1);
    var element = array[i];
    if (!element)
      var element = {};
    element[p] = object[prop];
    array[i] = element;
  }
  return array;
}
