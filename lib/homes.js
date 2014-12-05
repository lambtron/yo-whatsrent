
/**
 * Module dependencies.
 */

var apikey = process.env.KIMONO_API_KEY;
var baseUrl = 'https://www.kimonolabs.com/api/224ls486?apikey=' + apikey;
var thunkify = require('thunkify-wrap');
var request = require('request');

/**
 * Define `Homes`.
 */

var Homes = {};

/**
 * Returns average home prices given lat, lng.
 *
 * @params {Integer} lat
 * @params {Integer} lng
 */

Homes.getPrice = function *getPrice(lat, lng) {
  var get = thunkify(request.get);
  var boundaryString = '?kimpath3=' + getBoundaries(lat, lng) + '_xy';
  var data = yield get(baseUrl + qs + boundaryString);
  return normalizer(data.results.collection1);
});

/**
 * Expose thunkified `Home` client.
 */

module.exports = Homes;

/**
 * Private function to normalize home prices.
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
 * Private function to return the boundary as a string.
 *
 * @param {Integer} lat
 * @param {Integer} lng
 * @return {String}
 */

function getBoundaries(lat, lng) {
  var margin = 0.000001;
  var boundaryString = '' + (lat - margin) + ',' + (lat + margin) + ','
                     + (lng - margin) + ',' + (lng + margin);
  return boundaryString;
}
