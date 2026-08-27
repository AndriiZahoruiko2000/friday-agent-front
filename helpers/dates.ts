export function convertAmericanDaytoEuropeDay(day: number) {
  if (day === 0) {
    return 7;
  } else {
    return day;
  }
}

export function getFirstDateOfWeek(userDate: Date = new Date()) {
  const date = new Date(userDate);
  const day = convertAmericanDaytoEuropeDay(date.getDay()) - 1; // 3
  date.setDate(date.getDate() - day);
  return date;
}

export function getFirstDateOfMonth(userDate: Date = new Date()) {
  const date = new Date(userDate);
  date.setDate(1);
  return date;
}

export function getRangeDates(min: Date, max: Date) {
  const arr: Date[] = [];

  for (let i = min; i <= max; i.setDate(i.getDate() + 1)) {
    const copy = new Date(i);

    arr.push(copy);
  }
  return arr;
}

export function getLastDayOfWeek(userDate: Date = new Date()) {
  const date = new Date(userDate);
  const day = convertAmericanDaytoEuropeDay(date.getDay());
  date.setDate(date.getDate() + (7 - day));
  return date;
}

export function getLastDateOfMonth(userDate: Date = new Date()) {
  const date = new Date(userDate);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date;
}

export function getWeekRange() {
  const firstDayOfWeek = getFirstDateOfWeek();
  const lastDayOfWeek = getLastDayOfWeek();
  const range = getRangeDates(firstDayOfWeek, lastDayOfWeek);
  const newRange = range.map((item) => item.getDate());
  return newRange;
}

export function getTotalHours(
  start: string,
  end: string,
  breaks: { startTime: string; durationMinutes: number }[] = [],
) {
  const startTime = parseInt(start);
  const endTime = parseInt(end);

  const startMinutes = Number(start.slice(3));
  const endMinutes = Number(end.slice(3));

  const diffMinutes = endMinutes - startMinutes;

  const totalBreakMinutes = breaks.reduce(
    (sum, item) => sum + item.durationMinutes,
    0,
  );

  let totalMinutes = 0;

  if (endTime > startTime) {
    totalMinutes = (endTime - startTime) * 60 + diffMinutes;
  } else {
    const diff = 24 - startTime;
    totalMinutes = (diff + endTime) * 60 + diffMinutes;
  }

  return totalMinutes - totalBreakMinutes;
}

export function getNightHours(
  start: string,
  end: string,
  breaks: { startTime: string; durationMinutes: number }[] = [],
) {
  const startTime = parseInt(start);
  const endTime = parseInt(end);

  const startMinutes = Number(start.slice(3));
  const endMinutes = Number(end.slice(3));

  const firstDate = new Date();
  firstDate.setHours(startTime);
  firstDate.setMinutes(startMinutes);
  firstDate.setSeconds(0);

  const lastDate = new Date();
  lastDate.setHours(endTime);
  lastDate.setMinutes(endMinutes);
  lastDate.setSeconds(0);

  if (lastDate < firstDate) {
    lastDate.setDate(lastDate.getDate() + 1);
  }

  let counter = 0;

  while (firstDate < lastDate) {
    if (firstDate.getHours() < 5) {
      const copy = new Date(firstDate);
      copy.setHours(5);
      copy.setMinutes(0);
      const minDate = copy < lastDate ? copy : lastDate;
      counter += +minDate - +firstDate;
      firstDate.setTime(minDate.getTime());
      continue;
    }

    if (firstDate.getHours() < 23) {
      const copy = new Date(firstDate);
      copy.setHours(23);
      copy.setMinutes(0);
      firstDate.setTime(copy.getTime());
      continue;
    }

    if (firstDate.getHours() < 24) {
      const copy = new Date(firstDate);
      copy.setHours(24);
      copy.setMinutes(0);
      const minDate = copy < lastDate ? copy : lastDate;
      counter += +minDate - +firstDate;
      firstDate.setTime(minDate.getTime());
      continue;
    }
  }

  const nightBreakMinutes = breaks.reduce((sum, item) => {
    const breakStartHour = parseInt(item.startTime);
    const breakStartMinute = Number(item.startTime.slice(3));

    const breakStart = new Date();
    breakStart.setHours(breakStartHour, breakStartMinute, 0, 0);

    if (breakStartHour < 5) {
      breakStart.setDate(breakStart.getDate() + 1);
    }

    const breakEnd = new Date(breakStart);
    breakEnd.setMinutes(breakEnd.getMinutes() + item.durationMinutes);

    let nightMinutes = 0;

    const nightStart = new Date(breakStart);
    const nightEnd = new Date(breakStart);

    if (breakStartHour < 5) {
      nightStart.setDate(nightStart.getDate() - 1);
      nightStart.setHours(23, 0, 0, 0);

      nightEnd.setHours(5, 0, 0, 0);
    } else {
      nightStart.setHours(23, 0, 0, 0);

      nightEnd.setDate(nightEnd.getDate() + 1);
      nightEnd.setHours(5, 0, 0, 0);
    }

    const overlapStart = breakStart > nightStart ? breakStart : nightStart;

    const overlapEnd = breakEnd < nightEnd ? breakEnd : nightEnd;

    if (overlapStart < overlapEnd) {
      nightMinutes += (+overlapEnd - +overlapStart) / 1000 / 60;
    }

    return sum + nightMinutes;
  }, 0);

  return counter / 1000 / 60 - nightBreakMinutes;
}

getNightHours("23:00", "23:05");

// const date = new Date();

// const copyDate = new Date(date);

// date.setFullYear(2030);
// date.setMonth(2);
// date.setDate(21);

// date.setHours(date.getHours() + 1);
// date.setFullYear(date.getFullYear() + 1);

// copyDate.setHours(12);

// console.log(date.getFullYear());
// console.log(date.getMonth());
// console.log(date.getDate());
// console.log(date.getDay());
// console.log(date.getHours());
// console.log(date.getMinutes());
// console.log(date.getSeconds());
