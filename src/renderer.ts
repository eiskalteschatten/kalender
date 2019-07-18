import * as os from 'os';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

import calendar, { Week } from './calendar';

class Renderer {
  nunjucksEnv: nunjucks.Environment;
  writePath: string;

  constructor() {
    this.nunjucksEnv = nunjucks.configure(path.resolve(__dirname, '..', '..', 'src', 'templates'), {
      autoescape: true
    });

    this.writePath = path.resolve(os.tmpdir(), 'kalendar');
    mkdirp.sync(this.writePath);
  }

  render(): void {
    let pageNumber = 1;
    let twoWeeksIterator = 0;
    const twoWeeks: Week[][] = [];
    twoWeeks[twoWeeksIterator] = [];

    calendar.forEach((week: Week, i: number): void => {
      twoWeeks[twoWeeksIterator].push(week);
      if (i % 2 !== 0) {
        twoWeeksIterator++;
        twoWeeks[twoWeeksIterator] = [];
      }
    });

    for (const weeks of twoWeeks) {
      const months = weeks[1]
        ? [
          ...weeks[0].months,
          ...weeks[1].months
        ]
        : weeks[0].months;

      const years = weeks[1]
        ? [
          ...weeks[0].years,
          ...weeks[1].years
        ]
        : weeks[0].years;

      // TODO: remove duplicate months and years

      const renderedCalendar = this.nunjucksEnv.render('calendar.njk', {
        leftWeek: weeks[0],
        rightWeek: weeks[1],
        months,
        years,
        pageNumber
      });
      fs.writeFileSync(path.resolve(this.writePath, `calendar${pageNumber}.html`), renderedCalendar);
      console.log(path.resolve(this.writePath, `calendar${pageNumber}.html`));

      pageNumber++;

      const renderedRightside = this.nunjucksEnv.render('rightSide.njk', { pageNumber });
      fs.writeFileSync(path.resolve(this.writePath, `rightside${pageNumber}.html`), renderedRightside);
      console.log(path.resolve(this.writePath, `rightside${pageNumber}.html`));

      pageNumber++;
    }
  }
}

export default Renderer;
