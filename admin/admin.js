const logoHead = document.getElementById('logo-res-head')
const reservesContainer = document.querySelector('.reserves-container')
const reservesLoader = document.getElementById('reserves-loader')
const dateLabel = document.getElementById('reserves-date')
const tomorrowBtn = document.getElementById('tomorrow-btn')
const errorMessage = document.getElementById('res-err-msg')
const reservesCalendar = document.getElementById('cal-res-head')
const datePickerContainer = document.getElementById('res-date-picker--container')
const reservesHeader = document.querySelector('.reserves-header')
const reservesDatePicker = document.getElementById('res-date-picker')

const today = new Date()

const loadReserves = function(date) {

    const dateFormatted = `${String(date.getDate()).padStart(2,0)}/${String(date.getMonth() + 1).padStart(2,0)}/${date.getFullYear()}`
    console.log(dateFormatted);

    reservesContainer.classList.remove('visible')
    errorMessage.classList.remove('visible')
    reservesContainer.innerHTML = ''
    dateLabel.textContent = dateFormatted
    reservesLoader.classList.add('visible')

    fetch(`https://85eb-190-238-135-197.sa.ngrok.io/get-reservations?date=${dateFormatted}`, {
        method: 'POST',
        mode: 'cors'
    })
        .then(response => {
            if (response.status === 404) throw new Error('404')
            return response.json()
        })
        .then(data => {
            console.log(data);
            if (data.length === 0) throw new Error('No hay reservas')
            data.forEach(reservation => {
                const item = document.createElement('div')
                item.classList.add('reserves-item')
                const mainHtml = `
                    <h3>${reservation.name} - ${reservation.hour}</h3>

                    <div class="reservation-data">
                        <div class="res-pax">
                            <span class="reservation-label">Pax: </span>
                            <span class="reservation-value">${reservation.pax}</span>
                        </div>
                        <div class="res-telephone">
                            <span class="reservation-label">Teléfono: </span>
                            <span class="reservation-value">${reservation.phone}</span>
                        </div>
                        <div class="res-comment">
                            <span class="reservation-label">Comentario: </span>
                            <span class="reservation-value">${reservation.comment}</span>
                        </div>
                    </div>
                `
                item.insertAdjacentHTML('afterbegin', mainHtml)
                let endHtml
                if (reservation.confirmed) {
                    endHtml = `
                        <div class="reservation-confirmed">
                            <img src="/images/confirm-tick.png" alt="confirmado">
                        </div>
                    `
                } else {
                    endHtml = `
                        <div class="reservation-actions">
                            <a href="#" class="res-action">Confirmar</a>
                            <a href="#" class="res-action">Rechazar</a>
                        </div>
                    `
                }
                item.insertAdjacentHTML('beforeend', endHtml)
                reservesContainer.appendChild(item)
            })
            
        })
        .catch(error => {
            setTimeout(() => {
                errorMessage.textContent = 'No hay reservas'
                errorMessage.classList.add('visible')
            }, 3500)
        })
        .finally(() => {
            setTimeout(() => {
                reservesLoader.classList.remove('visible')
                reservesContainer.classList.add('visible')
            }, 3000)
        })
}

loadReserves(today)

tomorrowBtn.addEventListener('click', () => {
    if (tomorrowBtn.textContent !== 'hoy') {
        tomorrowBtn.textContent = 'hoy'
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)
        loadReserves(tomorrow)
    } else {
        tomorrowBtn.textContent = 'mañana'
        loadReserves(today)
    }
})

reservesCalendar.addEventListener('click', () => {
    reservesDatePicker.showPicker()
})

reservesDatePicker.addEventListener('change', () => {
    const date = new Date(reservesDatePicker.value)
    date.setHours(date.getHours()+5)
    loadReserves(date)
    if (today.toLocaleDateString() === date.toLocaleDateString()) {
        tomorrowBtn.textContent = 'mañana'
    } else {
        tomorrowBtn.textContent = 'hoy'
    }
})

logoHead.addEventListener('click', () => window.location.href = '/')

