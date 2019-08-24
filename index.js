/*
* Much of the code here is adapted from:
* https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
*/

const domStrings = {
    monthDropdown: "dropdown-month",
    yearDropdown: "dropdown-year",
    previousButton: "button-previous",
    nextButton: "button-next"
}
const lowestYear = 1950;
const highestYear = new Date().getFullYear() + 5;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function populateMonthDropdown() {
    const currentMonth = new Date().getMonth();
    let monthOptions;
    let monthIndex = 0;
    months.forEach(month => {
        if (monthIndex === currentMonth) {
            monthOptions += `<option value=${monthIndex} selected>` + month + "</option>"
        } else {
            monthOptions += `<option value=${monthIndex}>` + month + "</option>"
        }
        monthIndex++;
    });
    return monthOptions;
}

// https://stackoverflow.com/questions/20873302/html-looping-option-values-in-drop-down-list
function populateYearDropdown() {
    const currentYear = new Date().getFullYear();
    let yearOptions = "";
    for (let year = lowestYear; year <= highestYear; year++) {
        if (year === currentYear) {
            yearOptions += `<option value=${year} selected>` + year + "</option>";
        } else {
            yearOptions += `<option value=${year}>` + year + "</option>";
        }
    }
    return yearOptions;
}

function populateCalendarCells(year, month) {
    const maxRows = 6;
    const maxColumns = 7;
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    let firstDay = new Date(year, month).getDay() - 1;
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let date = 1;
    let columnsLeft;
    for (let i = 0; i < maxRows; i++) {
        let row = document.createElement("tr");
        columnsLeft = 7;
        //        if (date < daysInMonth && columnsLeft !== 0) {
        if (date <= daysInMonth) {
            for (let j = 0; j < maxColumns; j++) {
                // Need to move the first day to the correct position
                // in the case that it is less than 0
                if (firstDay < 0) {
                    firstDay = 6;
                }

                if (i === 0 && j < firstDay) {
                    createCell(row, "");
                } else if (date > daysInMonth && columnsLeft !== 0) {
                    createCell(row, "");

                } else if (columnsLeft !== 0) {
                    createCell(row, date);
                    date++;
                }

                columnsLeft--;
            }
        }

        calendar.appendChild(row);
    }
}

/* 
* Creates an individual cell of the calendar.
*/
function createCell(row, text) {
    let cell = document.createElement("td");
    let cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}

/* 
* Gets the current month and year selections from the dropdown.
*/
function getDropdownValues() {
    const year = document.getElementById(domStrings.yearDropdown).value;
    const month = document.getElementById(domStrings.monthDropdown).value;
    return [parseInt(year), parseInt(month)];
}

function setDropdownValues(yearIndex, monthIndex) {
    document.getElementById(domStrings.yearDropdown).value = yearIndex;
    document.getElementById(domStrings.monthDropdown).value = monthIndex;
}

function jumpToDropdownSelections() {
    const dropdownValues = getDropdownValues();
    populateCalendarCells(dropdownValues[0], dropdownValues[1]);
    checkButtonVisibility(dropdownValues[0], dropdownValues[1]);
}

function jumpToPreviousMonth() {
    const dropdownValues = getDropdownValues();
    if (dropdownValues[1] == 0) {
        dropdownValues[0] -= 1;
        dropdownValues[1] = 12;
    }
    setDropdownValues(dropdownValues[0], dropdownValues[1] - 1);
    populateCalendarCells(dropdownValues[0], dropdownValues[1] - 1);
    checkButtonVisibility(dropdownValues[0], dropdownValues[1] - 1);
}

function jumpToNextMonth() {
    const dropdownValues = getDropdownValues();
    if (dropdownValues[1] == 11) {
        dropdownValues[0] += 1;
        dropdownValues[1] = -1;
    }
    setDropdownValues(dropdownValues[0], dropdownValues[1] + 1);
    populateCalendarCells(dropdownValues[0], dropdownValues[1] + 1);
    checkButtonVisibility(dropdownValues[0], dropdownValues[1] + 1);
}

function checkButtonVisibility(year, month) {
    if (year === highestYear && month === 11) {
        document.getElementById(domStrings.nextButton).style.visibility = "hidden";
    } else if (year === lowestYear && month === 0) {
        document.getElementById(domStrings.previousButton).style.visibility = "hidden";
    } else {
        document.getElementById(domStrings.nextButton).style.visibility = "visible";
        document.getElementById(domStrings.previousButton).style.visibility = "visible";
    }
}

/* 
* Sets up the event listeners for the previous and next buttons.
*/
function setUpEventListeners() {
    document.getElementById(domStrings.previousButton).addEventListener('click', jumpToPreviousMonth);
    document.getElementById(domStrings.nextButton).addEventListener('click', jumpToNextMonth);
    document.getElementById(domStrings.monthDropdown).addEventListener('change', jumpToDropdownSelections)
    document.getElementById(domStrings.yearDropdown).addEventListener('change', jumpToDropdownSelections)
}

setUpEventListeners();
document.getElementById(domStrings.monthDropdown).innerHTML = populateMonthDropdown();
document.getElementById(domStrings.yearDropdown).innerHTML = populateYearDropdown();
jumpToDropdownSelections();