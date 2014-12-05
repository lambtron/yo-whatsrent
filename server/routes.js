
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var Homes = require('./homes');
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
  var user = {
    username: username,
    lat: parseFloat(location.substring(0, location.indexOf(';'))),
    lng: parseFloat(location.substring(location.indexOf(';') + 1))
  };
  var link = yield Homes.get(user);
  this.body = yield Yo.yo_link(username, link);
};

/**
 * Show rent or prices of homes nearby.
 */

Routes.showHomes = function *showHomes() {
  var homes = objectToArray(this.request.query);
  if (homes.length === 0) return this.body = yield render('404');
  this.body = yield render('homes', { homes: homes });
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
