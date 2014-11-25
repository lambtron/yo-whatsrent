
/**
 * Module dependencies.
 */

var geocoder = require('geocoder');
var thunkify = require('thunkify');
var Zillow = require('../lib/zillow');
var reverseGeocode = thunkify(geocode.reverseGeocode);

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
  var address = yield reverseGeocode(user.lat, user.lng);
  console.log(address);
};


/**
 * Expose `Homes`.
 */

module.exports = Homes;
