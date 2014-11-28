
/**
 * Module dependencies.
 */

var baseUrl = 'https://www.kimonolabs.com/api/a95bkn1q?apikey=Bd2gV40nhcS2JS9aK2slJ56DSpbGlMhh&kimpath2=';
var thunkify = require('thunkify-wrap');
var request = require('request');

/**
 * Define `Homes`.
 */

var Homes = {};

/**
 * Returns average home prices given zip code.
 *
 * @params {Integer} zipcode
 */

Homes.getPrice = function *getPrice(zipcode) {
  var get = thunkify(request.get);
  var data = yield get(baseUrl + '' + zipcode + '_zip');
  return normalizer(data.results.collection1);
});

/**
 * Private function to normalize home prices.
 *
 * @param {Array} homes
 *
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
 * Expose thunkified `Home` client.
 */

module.exports = Homes;
