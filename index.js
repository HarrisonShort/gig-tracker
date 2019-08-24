const domStrings = {
    monthDropdown: "monthDropdown",
    yearDropdown: "yearDropdown"
}

function populateMonthDropdown() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = new Date().getMonth();
    let monthOptions;
    let monthIndex = 0;
    months.forEach(month => {
        if (monthIndex === currentMonth) {
            monthOptions += `<option value=${month} selected>` + month + "</option>"
        } else {
            monthOptions += `<option value=${month}>` + month + "</option>"
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
    for (var year = lowestYear; year <= currentYear + 5; year++) {
        if (year === currentYear) {
            yearOptions += `<option value=${year} selected>` + year + "</option>";
        } else {
            yearOptions += `<option value=${year}>` + year + "</option>";
        }
    }
    return yearOptions;
}

//https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
function populateCalendarSquares() {
    const currentSelection = getCurrentDropdownSelections();
    console.log(`${currentSelection[0]} ${currentSelection[1]}`);
    //let firstDay = (new Date().getDay())
}

function getCurrentDropdownSelections() {
    month = document.getElementById(domStrings.monthDropdown).value;
    year = document.getElementById(domStrings.yearDropdown).value;
    let monthYear = [month, year];
    return monthYear;
}

document.getElementById(domStrings.monthDropdown).innerHTML = populateMonthDropdown();
document.getElementById(domStrings.yearDropdown).innerHTML = populateYearDropdown();
populateCalendarSquares(getCurrentDropdownSelections());