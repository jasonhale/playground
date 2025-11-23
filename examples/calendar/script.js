/**
 * @typedef {Object} Day
 * @property {Date} date
 * @property {string} formatted
 * @property {number} month
 * @property {number} year
 * @property {number} day
 * @property {string} monthName
 * @property {boolean} isFiller
 * @property {boolean} isToday
 * @property {boolean} isWeekend
 * @property {string} dayName
 * @property {string} dayShortName
 * @property {number} dayOfYear
 * @property {number} weekOfYear
 * @property {boolean} isFirstDayOfMonth
 * @property {number} dayInRange - The day's position in the range, starting at 1 for the first day
 */

/** @typedef {Date} RawDay */

/**
 * Generates an array of Day objects representing each day in the specified date range.
 * Optionally includes backfill days to complete the first week.
 * 
 * Uses native JS Date objects and locale methods to derive day properties.
 * 
 * Can be used to create calendar views.
 */




/**
 * 
 * @param {Date} start 
 * @param {Date} end 
 * @param {Date} today
 * @param {boolean} frontFill- Whether to add filler days to the start of the list to complete the week
 * @param {boolean} endFill - Whether to add filler days to the end of the list to complete the week
 * @returns {Day[] | null} Array of Day objects or null if start date is after end date
 */
function getCalendarDays(start, end, today, frontFill = true, endFill = false) {
    const startDate = new Date(start);
    startDate.setHours(0,0,0,0);
    const endDate = new Date(end);
    endDate.setHours(0,0,0,0);
    
    if (startDate > endDate) return null;
    
    const initialRawList = buildRawList(startDate, endDate);

    let rawFrontFill = [];
    if (frontFill) {
        rawFrontFill = buildFrontFill(startDate);
    }
    let rawEndFill = [];
    if (endFill) {
        rawEndFill = buildEndFill(endDate);
    }

    const calendarList = composeList(initialRawList, rawFrontFill, today);

    return calendarList;
}

function buildRawList(start, end) {
    const current = new Date(start);
    let returnArr = [];

    while (current <= end) {
        returnArr.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return returnArr;
}

function buildFrontFill(currDay) {
    const returnArr = [];
    const dayOfWeek = currDay.getDay();
    if (dayOfWeek === 0) return returnArr;

    const daysToAdd = dayOfWeek;
    for (let i = daysToAdd; i > 0; i--) {
        const newDate = new Date(currDay);
        newDate.setDate(newDate.getDate() - i);
        returnArr.push(newDate);
    }

    return returnArr;
}

function buildEndFill(currDay) {
    const returnArr = [];
    const dayOfWeek = currDay.getDay();
    if (dayOfWeek === 6) return returnArr;

    const daysToAdd = 6 - dayOfWeek;
    for (let i = daysToAdd; i > 0; i--) {
        const newDate = new Date(start);
        newDate.setDate(newDate.getDate() + i);
        returnArr.push(newDate);
    }

    return returnArr;
}

function composeList(rawList, backfill = [], today) {
    const finDateArr = [];

    backfill.forEach(date => {
        finDateArr.push(makeDayObject(date, true, today));
    });

    rawList.forEach((date, i) => {
        finDateArr.push(makeDayObject(date, false, today, i + 1));
    });

    return finDateArr;
}

function makeDayObject(date, isFiller = false, today, index) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const formatted = new Intl.DateTimeFormat().format(date);
    const dayName = date.toLocaleString('default', { weekday: 'long' });
    const dayShortName = date.toLocaleString('default', { weekday: 'short' });
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const isFirstDayOfMonth = day === 1;
    const weekOfYear = Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);
    const isToday = today ? (date.toDateString() === today.toDateString()) : false;

    return {
        date,
        formatted,
        month,
        year,
        day,
        monthName,
        isFiller,
        isToday,
        isWeekend,
        dayName,
        dayShortName,
        dayOfYear,
        weekOfYear,
        isFirstDayOfMonth,
        dayInRange: index
    };
}
