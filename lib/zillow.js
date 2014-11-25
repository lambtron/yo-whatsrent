
/**
 * Module dependencies.
 */

var Zillow = require('node-zillow');
var thunkify = require('thunkify-wrap');

/**
 * Zillow credentials
 */

var zillow = new Zillow(process.env.ZILLOW_ZSWID);

/**
 * Expose `Zillow` client.
 */

module.exports = Zillow;
