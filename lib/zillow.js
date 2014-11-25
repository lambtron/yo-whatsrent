
/**
 * Module dependencies.
 */

var Zillow = require('node-zillow');

/**
 * Zillow credentials
 */

var zillow = new Zillow(process.env.ZILLOW_ZWSID);

/**
 * Expose `zillow` client.
 */

module.exports = zillow;
