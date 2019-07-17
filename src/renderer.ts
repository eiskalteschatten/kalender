import * as os from 'os';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

class Renderer {
  nunjucksEnv: nunjucks.Environment;
  writePath: string;

  constructor() {
    this.nunjucksEnv = nunjucks.configure(path.resolve(__dirname, '..', 'src', 'templates'), {
      autoescape: true
    });

    this.writePath = path.resolve(os.tmpdir(), 'kalendar');
    mkdirp.sync(this.writePath);
  }

  render(): void {
    const renderedCalendar = this.nunjucksEnv.render('calendar.njk', { username: 'James' });
    const renderedRightside = this.nunjucksEnv.render('rightSide.njk', { username: 'James' });

    fs.writeFileSync(path.resolve(this.writePath, 'calendar.html'), renderedCalendar);
    fs.writeFileSync(path.resolve(this.writePath, 'rightside.html'), renderedRightside);

    console.log(path.resolve(this.writePath, 'calendar.html'));
  }
}

export default Renderer;
