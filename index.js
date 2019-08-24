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

document.getElementById("monthDropdown").innerHTML = populateMonthDropdown();
document.getElementById("yearDropdown").innerHTML = populateYearDropdown();