let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
let numDaysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

let selectedDay = currentDay;
let selectedMonth = currentMonth;
let selectedYear = currentYear;

const calendar = document.querySelector('.calendar');
const calendarHeader = document.querySelector('.calendar-header');
const monthYearLabel = document.querySelector('.mth');
const btn_next_mth = document.querySelector('.next-mth');
const btn_prev_mth = document.querySelector('.prev-mth');
const calendarDates = document.getElementById('calendar-dates');
let date_element = document.getElementById('date-element');

let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'];
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

renderCalendar(currentMonth, currentYear);

btn_next_mth.addEventListener('click', function() {
    changeMonth(1);
});
btn_prev_mth.addEventListener('click', function() {
    changeMonth(-1);
});    

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
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            cell.innerHTML = "&nbsp;";
            row.appendChild(cell);
        }
        calendarDates.appendChild(row)
    }

    // get the first day of the month
    let firstDay = new Date(currentYear, currentMonth, 1);
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
    for (let i = 0; i < 6; i++) {
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < 7; j++) {
            cells[j].innerHTML = '&nbsp;';
            
            if (day <= monthLength && (i > 0 || j + 1 >= startingDay)) {

                // add day class to add padding
                cells[j].classList.add('day');

                // set the element's value
                cells[j].innerHTML = day;

                // block unavailable days
                let thisDate = new Date(currentYear, currentMonth, day);
                // if (thisDate.getDay() === 0) {
                //     cells[j].classList.add('domingo');
                // }
                if (j === 6) {
                    cells[j].classList.add('day-blocked');
                }

                if (!cells[j].classList.contains('day-blocked')) {
                    // check if the cell contains the selected date
                    // if it does, add a border around it
                    if (day == selectedDay && currentMonth == selectedMonth && currentYear == selectedYear) {
                        cells[j].classList.add('day-selected');
                    }

                    // set the selected day
                    cells[j].addEventListener('click', function() {
                        selectedDay = cells[j].innerHTML;
                        selectedMonth = currentMonth;
                        selectedYear = currentYear;
                        renderCalendar(currentMonth, currentYear);
                        date_element.value = new Date(selectedYear, selectedMonth, selectedDay);
                    });
                }

                day++;
            }
        }
    }

    monthYearLabel.innerHTML = monthNames[currentMonth] + " " + year;

}