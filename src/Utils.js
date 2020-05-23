export const formatGigDate = (rawDate) => {
    // Get the month spelled out (not int value).
    var options = { month: 'long' };
    var month = new Intl.DateTimeFormat('en-US', options).format(rawDate);

    return `${rawDate.getDate()} ${month} ${rawDate.getFullYear()}`;
}

export const formatFinalDate = (gigDate, festivalEndDate) => {
    let date = formatGigDate(gigDate);

    if (festivalEndDate && gigDate.getTime() !== festivalEndDate.getTime()) {
        let end_date = formatGigDate(festivalEndDate);
        date += ' - ' + end_date;
    }

    return date;
}