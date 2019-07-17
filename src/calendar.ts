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
  months: string[];
  years: string[];
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

    for (const momentWeek of yearRange.by('week')) {
      momentWeek.locale(locale);

      const days: Day[] = [];
      const months: string[] = [];
      const years: string[] = [];

      const weekRange = moment.range(
        moment(momentWeek).locale(locale).day(1),
        moment(momentWeek).locale(locale).day(7),
      );

      for (const momentDay of weekRange.by('day')) {
        momentDay.locale(locale);

        const day: Day = {
          date: momentDay.date(),
          dayOfWeek: momentDay.format('dddd')
        };

        days.push(day);

        const month: string = momentDay.format('MMMM');
        if (!months.includes(month)) {
          months.push(month);
        }

        const year: string = momentDay.format('YYYY');
        if (!years.includes(year)) {
          years.push(year);
        }
      }

      const week: Week = {
        days,
        weekNumber: momentWeek.week(),
        months,
        years
      };

      this.weeks.push(week);
    }
  }

  getWeeks(): Week[] {
    return this.weeks;
  }
}

export default Calendar;
