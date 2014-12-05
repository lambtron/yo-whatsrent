
/**
 * Module dependencies.
 */

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
  var data = yield Kimono.get(lat, lng);
  // Normalize data.
  // Build query string.
  return link;
};

/**
 * Expose `Homes`.
 */

module.exports = Homes;

/**
 * Private function to normalize home prices.
 *
 * TODO: generalize this function, too tightly coupled with data format from Kimono
 *
 * @param {Array} homes
 * @return {Integer}
 */

function normalizer(homes) {
  var totalBedrooms = 0;
  var totalPrice = 0;
  homes.forEach(function(home) {
    if (home.apt_title.text.slice(1, 3) === 'bd' && home.price.length < 8) {
      totalBedrooms += parseInt(home.apt_title.text.slice(0, 1));
      totalPrice += parseInt(home.price.replace('$', '').replace(',', ''));
    }
  });
  return totalPrice.length / totalBedrooms.length;
}

/**
 * Private function to build querystring.
 *
 */

function buildQueryString() {
}