let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
let numDaysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

const calendar = document.querySelector('.calendar');
const calendarHeader = document.querySelector('.calendar-header');
const monthYearLabel = document.querySelector('.mth');
const btn_next_mth = document.querySelector('.next-mth');
const btn_prev_mth = document.querySelector('.prev-mth');
const calendarDates = document.getElementById('calendar-dates');

let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'];
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

renderCalendar(currentMonth, currentYear);

btn_next_mth.addEventListener('click', changeMonth(1));
btn_prev_mth.addEventListener('click', changeMonth(-1));    

function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar(currentMonth, currentYear);
}

function renderCalendar(month, year) {

    // clear the calendar
    calendarDates.innerHTML = '';

    // create the table rows and cells for the days of the month
    for (let i = 0; i < 5; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            cell.innerHTML = "&nbsp;";
            row.appendChild(cell);
        }
        calendarDates.appendChild(row)
    }

    // get the first day of the month
    let firstDay = new Date(currentYear, currentMonth +1, 1);
    let startingDay = firstDay.getDay();
    
    let monthLength = daysInMonth[currentMonth];

    // add one day to February for a leap year
    if (currentMonth == 1) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            monthLength++;
        }
    }

    // fill in the calendar
    let day = 1;
    let rows = calendarDates.getElementsByTagName('tr');
    for (let i = 0; i < 5; i++) {
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < 7; j++) {
            cells[j].innerHTML = '&nbsp;';
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                let dayString = day;
                if (day < 10) {
                    dayString = '0' + day;
                }
                cells[j].innerHTML = dayString;
                day++;
            }
        }
    }

    monthYearLabel.innerHTML = monthNames[currentMonth] + " " + year;

}