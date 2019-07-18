import * as os from 'os';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as pdf from 'html-pdf';
import * as mergePdf from 'easy-pdf-merge';

import * as config from '../config';
import Spinner from './spinner';
import calendar, { Week } from './calendar';

class Renderer {
  nunjucksEnv: nunjucks.Environment;
  htmlWritePath: string;
  pdfWritePath: string;
  htmlFilePaths: string[];
  pdfFilePaths: string[];

  constructor() {
    this.nunjucksEnv = nunjucks.configure(path.resolve(__dirname, '..', '..', 'src', 'templates'), {
      autoescape: true
    });

    this.htmlWritePath = path.resolve(os.tmpdir(), 'kalendar', 'html');
    mkdirp.sync(this.htmlWritePath);

    this.pdfWritePath = path.resolve(os.tmpdir(), 'kalendar', 'pdf');
    mkdirp.sync(this.pdfWritePath);

    this.htmlFilePaths = [];
    this.pdfFilePaths = [];
  }

  render(): void {
    this.renderHtml();
    this.renderPdf();
  }

  renderHtml(): void {
    const spinner = Spinner('Rendering HTML files...');
    spinner.start();

    let pageNumber = 1;
    let twoWeeksIterator = 0;
    const twoWeeks: Week[][] = [];

    calendar.forEach((week: Week, i: number): void => {
      if (!twoWeeks[twoWeeksIterator]) {
        twoWeeks[twoWeeksIterator] = [];
      }

      twoWeeks[twoWeeksIterator].push(week);

      if (i % 2 !== 0) {
        twoWeeksIterator++;
      }
    });

    for (const weeks of twoWeeks) {
      const months = new Set([
        ...weeks[0].months,
        ...weeks[1].months
      ]);

      const years = new Set([
        ...weeks[0].years,
        ...weeks[1].years
      ]);

      const monthsYears = {
        months: Array.from(months),
        years: Array.from(years)
      };

      const renderedCalendar = this.nunjucksEnv.render('calendar.njk', {
        leftWeek: weeks[0],
        rightWeek: weeks[1],
        monthsYears,
        pageNumber
      });

      const calendarPath = path.resolve(this.htmlWritePath, `calendar${pageNumber}.html`);
      fs.writeFileSync(calendarPath, renderedCalendar);
      this.htmlFilePaths.push(calendarPath);

      pageNumber++;

      const renderedRightside = this.nunjucksEnv.render('rightSide.njk', { pageNumber });

      const rightSidePath = path.resolve(this.htmlWritePath, `rightside${pageNumber}.html`);
      fs.writeFileSync(rightSidePath, renderedRightside);
      this.htmlFilePaths.push(rightSidePath);

      pageNumber++;
    }

    for (let i = 0; i < config.blankPages; i++) {
      const blankPageNumber = pageNumber + i;
      const blankPagePath = path.resolve(this.htmlWritePath, `blank${blankPageNumber}.html`);
      const renderedBlankPage = this.nunjucksEnv.render('blankPage.njk', { pageNumber: blankPageNumber });
      fs.writeFileSync(blankPagePath, renderedBlankPage);
      this.htmlFilePaths.push(blankPagePath);
    }

    spinner.stop();
  }

  async renderPdf(): Promise<void> {
    let spinner = Spinner('Rendering PDF files (this may take a while)...');
    spinner.start();

    let pageNumber = 1;

    for (const htmlFilePath of this.htmlFilePaths) {
      const html = fs.readFileSync(htmlFilePath, 'utf8');
      const pdfPath = path.resolve(this.pdfWritePath, `page${pageNumber}.pdf`);
      await this.createPdf(html, pdfPath);
      pageNumber++;
      this.pdfFilePaths.push(pdfPath);
    }

    spinner.stop();

    spinner = Spinner('Combining PDF files...');
    spinner.start();

    mergePdf(this.pdfFilePaths, config.savePdfPath, (error: any): void => {
      spinner.stop();

      if (error) {
        console.error(error);
        return;
      }

      console.log('\n\nThe PDF was created at', config.savePdfPath);
    });
  }

  private createPdf(html: string, pdfPath: string): Promise<any> {
    return new Promise((resolve, reject): void => {
      pdf.create(html, config.pdfOptions as any).toFile(pdfPath, (error, result): void => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    }).catch((error: any): void => {
      console.error(error);
    });
  }
}

export default Renderer;
