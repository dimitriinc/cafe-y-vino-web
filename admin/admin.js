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
    reservesContainer.classList.remove('visible')
    errorMessage.classList.remove('visible')
    reservesContainer.innerHTML = ''
    dateLabel.textContent = date.toLocaleDateString()
    reservesLoader.classList.add('visible')

    fetch('protocol://domain/resource')
        .then(response => {
            if (response.status === 404) throw new Error('404')
            return response.json()
        })
        .then(data => {
            if (data.length === 0) throw new Error('No hay reservas')
            data.forEach(reserve => {
                const item = document.createElement('div')
                item.classList.add('reserves-item')
                const mainHtml = `
                    <h3>${reserve.name} - ${reserve.hour}</h3>

                    <div class="reserve-data">
                        <div class="res-pax">
                            <span class="reserve-label">Pax: </span>
                            <span class="reserve-value">${reserve.pax}</span>
                        </div>
                        <div class="res-telephone">
                            <span class="reserve-label">Teléfono: </span>
                            <span class="reserve-value">${reserve.phone}</span>
                        </div>
                        <div class="res-comment">
                            <span class="reserve-label">Comentario: </span>
                            <span class="reserve-value">${reserve.comment}</span>
                        </div>
                    </div>
                `
                item.insertAdjacentHTML('afterbegin', mainHtml)
                let endHtml
                if (reserve.confirmed) {
                    endHtml = `
                        <div class="reserve-confirmed">
                            <img src="/images/confirm-tick.png" alt="confirmado">
                        </div>
                    `
                } else {
                    endHtml = `
                        <div class="reserve-actions">
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

