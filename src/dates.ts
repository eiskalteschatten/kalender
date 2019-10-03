import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

import * as config from '../config';

moment.locale('de');

let dates = {};

if (config.datesFileType === 'js') {
  dates = require('../dates');
}
else if (config.datesFileType === 'csv') {
  const csvPath = path.resolve(__dirname, '../../dates.csv');
  const csvStr = fs.readFileSync(csvPath, 'utf8');
  const csvLines = csvStr.split('\n');
  csvLines.shift();

  csvLines.forEach((line: string): void => {
    const parts = line.split(',');
    const date = moment(parts[2], config.formats.csvFormat).format('MM-DD');
    const title = parts[3];
    const type = parts[5];

    if (date == 'Invalid date' || !title) {
      return;
    }

    if (!Array.isArray(dates[date])) {
      dates[date] = [];
    }

    dates[date].push({ title, type });
  });
}
else {
  throw new Error('No valid file type for the dates file is specified.');
}

export default dates;
