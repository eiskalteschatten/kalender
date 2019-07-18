// Use this JavaScript file instead of TypeScript as a nasty hack because
// TypeScript complains about the 'date-holidays' constructor even though
// the module typings are correct

const Holidays = require('date-holidays');

const config = require('../config');

const holidays = new Holidays(
  config.holidays.country,
  config.holidays.state,
  config.holidays.region
);

module.exports = holidays;
