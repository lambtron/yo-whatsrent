
/**
 * Module dependencies.
 */

var apikey = process.env.KIMONO_API_KEY;
var baseUrl = 'https://www.kimonolabs.com/api/224ls486?apikey=' + apikey;
var thunkify = require('thunkify-wrap');
var request = require('request');

/**
 * Define `Kimono`.
 */

var Kimono = {};

/**
 * Get data from Kimono given lat, lng.
 *
 * @params {Integer} lat
 * @params {Integer} lng
 * @return {Object}
 */

Kimono.get = function *get(lat, lng) {
  var get = thunkify(request.get);
  var boundaryString = '?kimpath3=' + getBoundaries(lat, lng) + '_xy';
  var data = yield get(baseUrl + qs + boundaryString);
  return data;
};

/**
 * Expose `Kimono`.
 */

module.exports = Kimono;

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
