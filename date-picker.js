const month_element = document.querySelector('.mth');
const btn_next_mth = document.querySelector('.next-mth');
const btn_prev_mth = document.querySelector('.prev-mth');
const days_element = document.querySelector('.calendar-days');

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let date = new Date();
let day = date.getDay();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

month_element.textContent = months[month] + ' ' + year;

populateDates();

btn_next_mth.addEventListener('click', goToNextMonth);
btn_prev_mth.addEventListener('click', goToPrevMonth);

function goToNextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    month_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function goToPrevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    month_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function populateDates() {
    days_element.innerHTML = '';
    let amount_days = 31;
    if (month == 1) {
        amount_days = 28;
    }

    for (let i = 0; i < amount_days; i++) {
        let day_string = i + 1;
        if (i < 9) {
            day_string = '0' + day_string;
        }
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = day_string;

        if (selectedDay == i + 1 && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('day-selected');
        }

        day_element.addEventListener('click', function() {
            selectedDay = (i + 1);
            selectedMonth = month;
            selectedYear = year;

            populateDates();
        });

        days_element.appendChild(day_element);
    }
}
