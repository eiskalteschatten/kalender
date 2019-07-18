import * as config from '../config';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export interface Day {
  date: number;
  dayOfTheWeek: string;
  holiday?: string;
  entries?: string[];
}

export interface Week {
  days: Day[];
  weekNumber: number;
  months: string[];
  years: string[];
}

const calendar: Week[] = [];

const locale = config.locale;
const predefinedDates = config.dates;

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

    const entries = predefinedDates[momentDay.format('MM-DD')];

    const day: Day = {
      date: momentDay.date(),
      dayOfTheWeek: momentDay.format(config.formats.dayOfTheWeek),
      entries
    };

    days.push(day);

    const month: string = momentDay.format(config.formats.month);
    if (!months.includes(month)) {
      months.push(month);
    }

    const year: string = momentDay.format(config.formats.year);
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

  calendar.push(week);
}

export default calendar;
