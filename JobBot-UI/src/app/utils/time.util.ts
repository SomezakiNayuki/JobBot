import Time from 'src/models/time.model';

/**
 * Compare two Time objects.
 *
 * @param time1 time1
 * @param time2 time2
 * @returns negative number if time1 is earlier than time2, positive number if time1 is later than time2, 0 if they are the same day
 */
const compareDate = (time1: Time, time2: Time): number => {
  const [year1, month1, day1] = [time1.year, time1.month, time1.day];
  const [year2, month2, day2] = [time2.year, time2.month, time2.day];

  if (year1 !== year2) return year1 - year2;
  if (month1 !== month2) return month1 - month2;
  return day1 - day2;
};

const convertDateStringToTimeObject = (dateString: string): Time => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Time([year, month, day, 0, 0]);
};

const dateToTime = (date: Date): Time => {
  return new Time([date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()]);
}

const calculateTimeDifferenceInDays = (time1: Time, time2: Time): number => {
  const yearDiff = time1.year - time2.year;
  const monthDiff = time1.month - time2.month;
  const dayDiff = time1.day - time2.day;
  const hourDiff = time1.hour - time2.hour;
  const minuteDiff = time1.minute - time2.minute;
  const totalDiffInMinutes = yearDiff * 365 * 24 * 60 + monthDiff * 30 * 24 * 60 + dayDiff * 24 * 60 + hourDiff * 60 + minuteDiff;
  const result = Math.floor(totalDiffInMinutes / (24 * 60));
  return result;
}

export { compareDate, convertDateStringToTimeObject, dateToTime, calculateTimeDifferenceInDays };