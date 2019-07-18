const path = require('path');

module.exports = {
  locale: 'en-GB',
  startDate: '2020-01-01',
  endDate: '2020-12-31',
  blankPages: 200,
  savePdfPath: path.resolve(__dirname, '..', 'calendar.pdf'),

  // For all options, see https://www.npmjs.com/package/date-holidays
  holidays: {
    country: 'DE',
    state: 'BY',
    region: ''
  },

  dates: {
    '07-17': [
      'Kalender\'s Birthday'
    ],
    '01-06': [
      'Billy\'s Birthday',
      'Some other event'
    ],
    '12-31': [
      'Dad\'s Birthday',
      'Some other event'
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
    format: 'A5',
    orientation: 'portrait',
    base: path.resolve(__dirname, 'src', 'templates', 'assets'),
    type: 'pdf'
  }
};
