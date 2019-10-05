const path = require('path');

module.exports = {
  locale: 'en-GB',
  startDate: '2020-01-01',
  endDate: '2020-12-31',
  blankPages: 200,
  firstPageBlank: true,
  savePdfPath: path.resolve(__dirname, '..', 'calendar.pdf'),

  // 'js' or 'csv'
  datesFileType: 'js',

  // For all options, see https://www.npmjs.com/package/date-holidays
  holidays: {
    country: 'DE',
    state: 'BY',
    region: ''
  },

  dateColors: {
    birthday: '#0074D9',
    practice: '#2ECC40'
  },

  // For more options, see https://momentjs.com/docs/#/displaying/format/
  formats: {
    dayOfTheWeek: 'dddd',
    month: 'MMMM',
    year: 'YYYY',
    csvFormat: 'DD.MM.YYYY'
  },

  // For more PDF options, see https://www.npmjs.com/package/html-pdf
  pdfOptions: {
    format: 'A5',
    orientation: 'portrait',
    base: path.resolve(__dirname, 'src', 'templates', 'assets'),
    type: 'pdf'
  }
};
