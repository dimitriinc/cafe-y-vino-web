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
let currentDate = today

if (sessionStorage.getItem('date')) {
    currentDate = new Date(sessionStorage.getItem('date'))
    if (currentDate.toLocaleDateString() !== today.toLocaleDateString()) tomorrowBtn.textContent = 'hoy'
}

const loadReserves = function(date) {

    const dateFormatted = `${String(date.getDate()).padStart(2,0)}/${String(date.getMonth() + 1).padStart(2,0)}/${date.getFullYear()}`

    reservesContainer.classList.remove('visible')
    errorMessage.classList.remove('visible')
    reservesContainer.innerHTML = ''
    dateLabel.textContent = dateFormatted
    reservesLoader.classList.add('visible')

    fetch(`https://bace-190-238-135-197.sa.ngrok.io/get-reservations?date=${dateFormatted}`, {
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
                            <div class="reservation-action-container">
                                <button data-id="${reservation.id}" data-email="${reservation.email}" data-name="${reservation.name}" data-date="${reservation.date}" data-hour="${reservation.hour}" class="res-action btn-confirm-res">Confirmar</button>
                                <img id="reservation-confirmation-loader" class="reservation-loader" src="/images/loaders/res-actions.svg" alt="loader">
                            </div>
                            <div class="reservation-action-container">
                                <button data-id="${reservation.id}" data-email="${reservation.email}" data-name="${reservation.name}" data-date="${reservation.date}" data-hour="${reservation.hour}" class="res-action btn-reject-res">Rechazar</button>
                                <img id="reservation-rejection-loader" class="reservation-loader" src="/images/loaders/res-actions.svg" alt="loader">
                            </div>
                        </div>
                    `
                }
                item.insertAdjacentHTML('beforeend', endHtml)
                reservesContainer.appendChild(item)
            })
            
        })
        .catch(error => {
            setTimeout(() => {
                errorMessage.textContent = error.message
                errorMessage.classList.add('visible')
            }, 0)
        })
        .finally(() => {
            setTimeout(() => {
                reservesLoader.classList.remove('visible')
                reservesContainer.classList.add('visible')
            }, 0)
        })
}

reservesContainer.addEventListener('click', event => {

    if (event.target.innerHTML === 'Confirmar') {

        console.log('CONFIRMAR pressed');
        const data = event.target.dataset
        const loader = event.target.nextElementSibling
        const btnReject = event.target.closest('.reservation-actions').querySelector('.btn-reject-res')
        console.log(btnReject);
        event.target.setAttribute('style', 'opacity: 0; z-index: 1; pointer-events: none;')
        loader.setAttribute('style', 'opacity: 1; visibility: visible;')
        btnReject.setAttribute('style', 'pointer-events: none;')

        fetch(`https://bace-190-238-135-197.sa.ngrok.io/confirm-reservation?email=${data.email}&name=${data.name}&date=${data.date}&hour=${data.hour}&id=${data.id}`, {
            method: 'POST',
            mode: 'cors'
        })
            .then(() => location.reload())
            .catch(() => {
                loader.removeAttribute('style')
                event.target.removeAttribute('style')
                btnReject.removeAttribute('style')
                alert('Ha ocurrido un error.\nInténtalo de nuevo más tarde.')
            })

    } else if (event.target.innerHTML === 'Rechazar') {

        console.log('RECHAZAR pressed');
        const data = event.target.dataset
        const loader = event.target.nextElementSibling
        const btnConfirm = event.target.closest('.reservation-actions').querySelector('.btn-confirm-res')
        console.log(btnConfirm);
        event.target.setAttribute('style', 'opacity: 0; z-index: 1; pointer-events: none;')
        loader.setAttribute('style', 'opacity: 1; visibility: visible;')
        btnConfirm.setAttribute('style', 'pointer-events: none;')

        fetch(`https://bace-190-238-135-197.sa.ngrok.io/reject-reservation?email=${data.email}&name=${data.name}&date=${data.date}&hour=${data.hour}&id=${data.id}`, {
            method: 'POST',
            mode: 'cors'
        })
            .then(() => location.reload())
            .catch(() => {
                loader.removeAttribute('style')
                event.target.removeAttribute('style')
                btnConfirm.removeAttribute('style')
                alert('Ha ocurrido un error.\nInténtalo de nuevo más tarde.')
            })
    }
})

loadReserves(currentDate)

tomorrowBtn.addEventListener('click', () => {
    if (tomorrowBtn.textContent !== 'hoy') {
        tomorrowBtn.textContent = 'hoy'
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)
        loadReserves(tomorrow)
        sessionStorage.setItem('date', tomorrow)
    } else {
        tomorrowBtn.textContent = 'mañana'
        loadReserves(today)
        sessionStorage.setItem('date', today)
    }
})

reservesCalendar.addEventListener('click', () => {
    reservesDatePicker.showPicker()
})

reservesDatePicker.addEventListener('change', () => {
    const date = new Date(reservesDatePicker.value)
    date.setHours(date.getHours()+5)
    loadReserves(date)
    sessionStorage.setItem('date', date)
    if (today.toLocaleDateString() === date.toLocaleDateString()) {
        tomorrowBtn.textContent = 'mañana'
    } else {
        tomorrowBtn.textContent = 'hoy'
    }
})

logoHead.addEventListener('click', () => window.location.href = '/')

