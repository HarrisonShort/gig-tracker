let today;
let currentDay
let currentMonth;
let currentYear;

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthAndYear = document.getElementById('monthAndYear');

goToToday()

function showCalendar(month, year) {
    // Subtract one from first day as we're going Monday to Sunday
    let firstDay = (new Date(year, month)).getDay() - 1;
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let table = document.getElementById("calendar-body");

    // Clear previous month of cells
    table.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year

    let date = 1;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr')

        if (date <= daysInMonth) {
            for (let j = 0; j < 7; j++) {
                if (i == 0 && j < firstDay) {
                    // Create empty cell
                    let cell = document.createElement('td')
                    let cellText = document.createTextNode("")
                    cell.appendChild(cellText)
                    row.appendChild(cell)
                } else if (date > daysInMonth) {
                    // Create empty cell
                    let cell = document.createElement('td')
                    let cellText = document.createTextNode("")
                    cell.appendChild(cellText)
                    row.appendChild(cell)
                } else {
                    // Create cell with date
                    let cell = document.createElement('td')
                    let cellText = document.createTextNode(date)

                    cell.appendChild(cellText)
                    row.appendChild(cell)
                    cell.setAttribute('onclick', 'openGigForm(this)')

                    if (currentDay === date && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                        cell.style.background = "yellow"
                    }

                    date++;
                }
            }
        } else {
            // Stop adding rows if the next row won't have dates
            break;
        }

        table.appendChild(row);
    }
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear
    currentMonth = (currentMonth + 1) % 12
    showCalendar(currentMonth, currentYear)
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1
    showCalendar(currentMonth, currentYear)
}

function goToToday() {
    getToday()
    showCalendar(currentMonth, currentYear)
}

function getToday() {
    today = new Date();
    currentDay = today.getDate();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
}