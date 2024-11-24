export function getDayOfYear(date = new Date()){
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000*60*60*24;
    return Math.floor(diff / oneDay);
}

export function getISOWeekNumber(date) {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNumber = tempDate.getUTCDay() || 7; 
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber); 
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    return Math.ceil(((tempDate - yearStart) / (1000 * 60 * 60 * 24) + 1) / 7);
}

export function generateYearGrid(year) {
    const daysInYear = isLeapYear(year) ? 366 : 365;
    const grid = [];
    let week = [];
    let lastWeekNumber = null;

    for (let day = 1; day <= daysInYear; day++) {
        const date = new Date(year, 0, day);
        const weekNumber = getISOWeekNumber(date);

        const dayObj = {
            dayOfYear: day,
            date: date.toISOString().split('T')[0],
            dayOfWeek: date.toLocaleString('en-US', { weekday: 'long' }), 
            state: 0,
            reservation: {},
            weekNumber: weekNumber
        };

        if (weekNumber !== lastWeekNumber && week.length > 0) {
            grid.push({ weekNumber: lastWeekNumber, days: week });
            week = [];
        }

        week.push(dayObj);
        lastWeekNumber = weekNumber; 
    }

    if (week.length > 0) {
        grid.push({ weekNumber: lastWeekNumber, days: week });
    }

    return grid;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}