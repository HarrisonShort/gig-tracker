/*
* Much of the code here is adapted from:
* https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
*/

const domStrings = {
    monthDropdown: "monthDropdown",
    yearDropdown: "yearDropdown"
}

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
    const lowestYear = 1950;
    const currentYear = new Date().getFullYear();
    let yearOptions = "";
    for (let year = lowestYear; year <= currentYear + 5; year++) {
        if (year === currentYear) {
            yearOptions += `<option value=${year} selected>` + year + "</option>";
        } else {
            yearOptions += `<option value=${year}>` + year + "</option>";
        }
    }
    return yearOptions;
}

function populateCalendarCells() {
    const maxRows = 6;
    const maxColumns = 7;
    const currentSelection = getCurrentDropdownSelections();
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";
    //console.log(`${currentSelection[0]} ${currentSelection[1]}`);

    let firstDay = new Date(currentSelection[1], currentSelection[0]).getDay() - 1;
    let daysInMonth = 32 - new Date(currentSelection[1], currentSelection[0], 32).getDate();

    let date = 1;
    let columnsLeft;
    for (let i = 0; i < maxRows; i++) {
        let row = document.createElement("tr");
        columnsLeft = 7;

        for (let j = 0; j < maxColumns; j++) {
            // Need to move the first day to the correct position
            // in the case that it is less than 0
            if (firstDay < 0) {
                firstDay = 6;
            }

            if (i === 0 && j < firstDay) {
                createCell(row, "");
            }
            else if (date > daysInMonth && columnsLeft !== 0) {
                createCell(row, "");
            } else if (columnsLeft !== 0) {
                createCell(row, date);
                date++;
            }
            columnsLeft--;
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
function getCurrentDropdownSelections() {
    const month = document.getElementById(domStrings.monthDropdown).value;
    const year = document.getElementById(domStrings.yearDropdown).value;
    return [parseInt(month), parseInt(year)];
}

function setUpEventListeners() {

}

function

    document.getElementById(domStrings.monthDropdown).innerHTML = populateMonthDropdown();
document.getElementById(domStrings.yearDropdown).innerHTML = populateYearDropdown();
populateCalendarCells(getCurrentDropdownSelections());