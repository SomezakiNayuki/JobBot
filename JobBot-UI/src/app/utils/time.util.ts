const compareTime = (time1: number[], time2: number[]): number => {
  const [year1, month1, day1] = time1;
  const [year2, month2, day2] = time2;

  if (year1 !== year2) return year1 - year2;
  if (month1 !== month2) return month1 - month2;
  return day1 - day2;
};

const convertDateStringToArray = (dateString: string): number[] => {
  const [year, month, day] = dateString.split('-').map(Number);
  return [year, month, day];
};

export {
  compareTime,
  convertDateStringToArray,
};