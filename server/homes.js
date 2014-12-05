
/**
 * Module dependencies.
 */

var domain = 'http://yo-whatsrent.herokuapp.com/';
var Kimono = require('../lib/kimono');
var Zillow = require('../lib/zillow');
var Geocoder = require('geocoder');
var thunkify = require('thunkify');
var geo = thunkify(Geocode);

/**
 * Define `Homes`.
 */

var Homes = {};

/**
 * Get link with homes near the user.
 *
 * @param {Object} user
 */

Homes.get = function *get(user) {
  // var geos = yield geo.reverseGeocode(user.lat, user.lng);
  // var address = geos.results[0].formatted_address;
  // var array = address.split(',');
  // var load = {
  //   address: array[0].trim(),
  //   city: array[1].trim(),
  //   state: array[2].split(' ')[1],
  //   zip: array[2].split(' ')[2],
  //   rentestimate: true
  // };
  // var zillow = yield Zillow.getDeepSearchResults(load);
  // What if no result? How to get nearby address?

  // Alternative.
  var avgPrice = yield Kimono.get(lat, lng);
  // Build query string.
  return domain + buildQueryString(avgPrice);
};

/**
 * Expose `Homes`.
 */

module.exports = Homes;

/**
 * Private function to build querystring.
 *
 */

function buildQueryString(price) {
  var q = '?price=' + price;
  return q;
}