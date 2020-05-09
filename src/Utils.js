export const formatGigDate = (rawDate) => {
    // Get the month spelled out (not int value).
    var options = { month: 'long' };
    var month = new Intl.DateTimeFormat('en-US', options).format(rawDate);

    return `${rawDate.getDate()} ${month} ${rawDate.getFullYear()}`;
}