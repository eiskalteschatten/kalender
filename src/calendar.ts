import * as config from '../config';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export interface Day {
  date: number;
  dayOfWeek: string;
  holiday?: string;
  entries?: string[];
}

export interface Week {
  days: Day[];
  weekNumber: number;
  // months: string[];
  // years: number[];
}

class Calendar {
  private weeks: Week[] = [];

  constructor() {
    const locale = config.locale;
    const configuredStartDate = moment(config.startDate);
    const startDate = moment(configuredStartDate).locale(locale).startOf('week');

    const configuredEndDate = moment(config.endDate);
    const endDate = moment(configuredEndDate).locale(locale).endOf('week');

    const yearRange = moment.range(startDate, endDate);

    for (let momentWeek of yearRange.by('week')) {
      momentWeek.locale(locale);

      const days: Day[] = [];

      const weekRange = moment.range(
        moment(momentWeek).locale(locale).day(1),
        moment(momentWeek).locale(locale).day(7),
      );

      for (let momentDay of weekRange.by('day')) {
        momentDay.locale(locale);

        const day: Day = {
          date: momentDay.date(),
          dayOfWeek: momentDay.format('dddd')
        };

        days.push(day);
      }


      const week: Week = {
        days,
        weekNumber: momentWeek.week(),
        // months: ,
        // years: momentWeek.years()
      };

      this.weeks.push(week);
    }

    console.log(JSON.stringify(this.weeks));
  }

  getWeeks(): Week[] {
    return this.weeks;
  }
}

export default Calendar;
