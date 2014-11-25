
/**
 * Module dependencies.
 */

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
  var addressObj = yield geo.reverseGeocode(user.lat, user.lng);
  var address = addressObj.results[0].formatted_address;
};


/**
 * Expose `Homes`.
 */

module.exports = Homes;
