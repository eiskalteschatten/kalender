const path = require('path');

module.exports = {
  locale: 'en-GB',
  startDate: '2020-01-01',
  endDate: '2020-12-31',

  dates: {
    '07-17': [
      'Birthday'
    ]
  },

  // For more options, see https://momentjs.com/docs/#/displaying/format/
  formats: {
    dayOfTheWeek: 'dddd',
    month: 'MMMM',
    year: 'YYYY'
  },

  // For more PDF options, see https://www.npmjs.com/package/html-pdf
  pdfOptions: {
    directory: path.resolve(__dirname),
    format: 'A5',
    orientation: 'portrait',
    base: path.resolve(__dirname, 'src', 'templates', 'assets'),
    type: 'pdf'
  }
};
