import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

import * as config from '../config';
import * as holidays from './holidays';
import dates from './dates';

const moment = extendMoment(Moment);

export interface Entry {
  title: string;
  type: string;
}

export interface Day {
  date: number;
  dayOfTheWeek: string;
  holiday?: string;
  entries?: Entry[];
}

export interface Week {
  days: Day[];
  weekNumber: number;
  months: string[];
  years: string[];
}

const calendar: Week[] = [];

const locale = config.locale;

const configuredStartDate = moment(config.startDate);
const startDate = moment(configuredStartDate).locale(locale).startOf('week');

const configuredEndDate = moment(config.endDate);
const endDate = moment(configuredEndDate).locale(locale).endOf('week');

let yearRange = moment.range(startDate, endDate);

if (Array.from(yearRange.by('week')).length % 2 !== 0) {
  const oneWeekLater = moment(endDate).add(1, 'weeks').endOf('week');
  yearRange = moment.range(startDate, oneWeekLater);
}

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

    const entries = dates[momentDay.format('MM-DD')];
    const holiday = holidays.isHoliday(momentDay.toDate());

    const day: Day = {
      date: momentDay.date(),
      dayOfTheWeek: momentDay.format(config.formats.dayOfTheWeek),
      holiday: holiday ? holiday.name : '',
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
