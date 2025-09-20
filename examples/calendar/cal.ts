export type Day = {
    date: Date;
    formatted: string;
    month: number;
    year: number;
    day: number;
    monthName: string;
    isFiller: boolean;
    isToday: boolean;
    isWeekend: boolean;
    dayName: string;
    dayShortName: string;
    dayOfYear: number;
    weekOfYear: number;
    isFirstDayOfMonth: boolean;
    dayInRange?: number;
}

type RawDay = Date;

/**
 * Generates an array of Day objects representing each day in the specified date range.
 * Optionally includes backfill days to complete the first week.
 * 
 * Uses native JS Date objects and locale methods to derive day properties.
 * 
 * Can be used to create calendar views.
 */

export function getCalendarDays(start: Date, end: Date, today?: Date, withBackfill = true): Day[] | null {
    const startDate = new Date(start);
    startDate.setHours(0,0,0,0);
    const endDate = new Date(end);
    endDate.setHours(0,0,0,0);
    
    if (startDate > endDate) return null;
    
    const initialRawList = buildRawList(startDate, endDate);

    let rawBackfill: RawDay[] = [];
    if (withBackfill) {
        rawBackfill = buildBackfill(startDate);
    }

    const calendarList = composeList(initialRawList, rawBackfill, today);

    return calendarList;
}

function buildRawList(start: Date, end: Date) {
    const current = new Date(start);
    let returnArr: RawDay[] = [];

    while (current <= end) {
        returnArr.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return returnArr;
}

function buildBackfill(start: Date): RawDay[] {
    const returnArr: RawDay[] = [];
    const dayOfWeek = start.getDay();
    if (dayOfWeek === 0) return returnArr;

    const daysToAdd = dayOfWeek;
    for (let i = daysToAdd; i > 0; i--) {
        const newDate = new Date(start);
        newDate.setDate(newDate.getDate() - i);
        returnArr.push(newDate);
    }

    return returnArr;
}

function composeList(rawList: RawDay[], backfill: RawDay[] = [], today?: Date): Day[] {
    const finDateArr: Day[] = [];

    backfill.forEach(date => {
        finDateArr.push(makeDayObject(date, true, today));
    });

    rawList.forEach((date, i) => {
        finDateArr.push(makeDayObject(date, false, today, i + 1));
    });

    return finDateArr;
}

function makeDayObject(date: Date, isFiller = false, today?: Date, index?: number): Day {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const formatted = new Intl.DateTimeFormat().format(date);
    const dayName = date.toLocaleString('default', { weekday: 'long' });
    const dayShortName = date.toLocaleString('default', { weekday: 'short' });
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = (date as any) - (startOfYear as any);
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
