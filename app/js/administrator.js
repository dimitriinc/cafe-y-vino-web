const BACKEND_BASE_URL = 'https://3103-190-238-135-197.ngrok-free.app'

const logoHead = document.getElementById('logo-res-head')
const reservationsContainer = document.querySelector('.reservations-container')
const reservationsLoader = document.getElementById('reservations-loader')
const dateLabel = document.getElementById('reservations-date')
const tomorrowBtn = document.getElementById('tomorrow-btn')
const errorMessage = document.getElementById('res-err-msg')
const reservationsCalendar = document.getElementById('cal-res-head')
const datePickerContainer = document.getElementById('res-date-picker--container')
const reservationsHeader = document.querySelector('.reservations-header')
const reservationsDatePicker = document.getElementById('res-date-picker')

class Administrator {

    _today
    _currentDate

    constructor() {
        this._today = new Date()
        this._currentDate = sessionStorage.getItem('date') ? new Date(sessionStorage.getItem('date')) : this._today
        if (this._currentDate.toLocaleDateString() !== this._today.toLocaleDateString()) tomorrowBtn.textContent = 'hoy'

        this._loadReservations()
        this._assignEventListeners()
    }

    async _loadReservations() {
        this._renderLoader()
        const dateFormatted = this._renderDateLabel(this._currentDate)

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/get-reservations?date=${dateFormatted}`, {
                method: 'POST'
            })
            const data = await response.json()
    
            if (!data.length) throw new Error('No hay reservas')
    
            console.log(data);
    
            data.forEach(reservation => {
                const reservationElement = this._createReservationElement(reservation)
                reservationsContainer.appendChild(reservationElement)
            })
    
            this._renderReservations()
        } catch (error) {
            this._renderError(error.message)
        }
        
    }

    _renderDateLabel(date) {
        const dateFormatted = `${String(date.getDate()).padStart(2,0)}/${String(date.getMonth() + 1).padStart(2,0)}/${date.getFullYear()}`
        dateLabel.textContent = dateFormatted
        return dateFormatted
    }

    _renderLoader() {
        reservationsContainer.classList.remove('visible')
        errorMessage.classList.remove('visible')
        reservationsContainer.innerHTML = ''
        reservationsLoader.classList.add('visible')
    }

    _renderReservations() {
        reservationsLoader.classList.remove('visible')
        reservationsContainer.classList.add('visible')
    }

    _renderError(message) {
        errorMessage.textContent = message
        errorMessage.classList.add('visible')
        reservationsLoader.classList.remove('visible')
        reservationsContainer.classList.add('visible')
    }

    _createReservationElement(reservation) {
        const item = document.createElement('div')
        item.classList.add('reservation-item')
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
                        <button data-id="${reservation.id}" data-email="${reservation.email}" data-name="${reservation.name}" data-date="${reservation.date}" data-hour="${reservation.hour}" class="reservation-action btn-confirm-res">Confirmar</button>
                        <img id="reservation-confirmation-loader" class="reservation-loader" src="/images/loaders/res-actions.svg" alt="loader">
                    </div>
                    <div class="reservation-action-container">
                        <button data-id="${reservation.id}" data-email="${reservation.email}" data-name="${reservation.name}" data-date="${reservation.date}" data-hour="${reservation.hour}" class="reservation-action btn-reject-res">Rechazar</button>
                        <img id="reservation-rejection-loader" class="reservation-loader" src="/images/loaders/res-actions.svg" alt="loader">
                    </div>
                </div>
            `
        }
        item.insertAdjacentHTML('beforeend', endHtml)
        return item
    }

    _assignEventListeners() {

        // Confirm/Reject buttons with event delegation
        reservationsContainer.addEventListener('click', event => {
            if (event.target.innerHTML === 'Confirmar') this._handleConfirmation(event.target)
            else if (event.target.innerHTML === 'Rechazar') this._handleRejection(event.target)
        })

        tomorrowBtn.addEventListener('click', () => {
            if (tomorrowBtn.textContent !== 'hoy') {
                tomorrowBtn.textContent = 'hoy'
                const tomorrow = new Date()
                tomorrow.setDate(this._today.getDate() + 1)
                this._currentDate = tomorrow

                this._loadReservations()
                sessionStorage.setItem('date', tomorrow)
            } else {
                tomorrowBtn.textContent = 'mañana'
                this._currentDate = this._today
                this._loadReservations()
                sessionStorage.setItem('date', this._today)
            }
        })

        reservationsCalendar.addEventListener('click', () => {
            reservationsDatePicker.showPicker()
        })

        reservationsDatePicker.addEventListener('change', () => {
            const date = new Date(reservationsDatePicker.value)
            // Adjust to the peruvian time
            date.setHours(date.getHours()+5)
            this._currentDate = date
            this._loadReservations()
            sessionStorage.setItem('date', date)

            if (this._today.toLocaleDateString() === date.toLocaleDateString()) {
                tomorrowBtn.textContent = 'mañana'
            } else {
                tomorrowBtn.textContent = 'hoy'
            }
        })

        logoHead.addEventListener('click', () => window.location.href = '/')
    }

    async _handleConfirmation(btnConfirm) {
        const data = btnConfirm.dataset
        const loader = btnConfirm.nextElementSibling
        const actionsContainer = btnConfirm.closest('.reservation-actions')
        const btnReject = actionsContainer.querySelector('.btn-reject-res')

        // Render submit animation
        btnConfirm.setAttribute('style', 'opacity: 0; z-index: 1; pointer-events: none;')
        loader.setAttribute('style', 'opacity: 1; visibility: visible;')
        btnReject.setAttribute('style', 'pointer-events: none;')

        try {
            await fetch(`${BACKEND_BASE_URL}/confirm-reservation?email=${data.email}&name=${data.name}&date=${data.date}&hour=${data.hour}&id=${data.id}`, {
                method: 'POST',
                mode: 'cors'
            })

            // Remove the buttons, render a confirmation sign
            const itemWrapper = actionsContainer.closest('.reservation-item')
            actionsContainer.remove()
            itemWrapper.insertAdjacentHTML('beforeend', `
                <div class="reservation-confirmed">
                    <img src="/images/confirm-tick.png" alt="confirmado">
                </div>
            `)
        } catch (_) {
            // Render back the buttons
            loader.removeAttribute('style')
            btnConfirm.removeAttribute('style')
            btnReject.removeAttribute('style')
            alert('Ha ocurrido un error.\nInténtalo de nuevo.')
        }
    }

    async _handleRejection(btnReject) {
        const data = btnReject.dataset
        const loader = btnReject.nextElementSibling
        const actionsContainer = btnReject.closest('.reservation-actions')
        const btnConfirm = actionsContainer.querySelector('.btn-confirm-res')

        // Render submit animation
        btnReject.setAttribute('style', 'opacity: 0; z-index: 1; pointer-events: none;')
        loader.setAttribute('style', 'opacity: 1; visibility: visible;')
        btnConfirm.setAttribute('style', 'pointer-events: none;')

        try {
            await  fetch(`${BACKEND_BASE_URL}/reject-reservation?email=${data.email}&name=${data.name}&date=${data.date}&hour=${data.hour}&id=${data.id}`, {
                method: 'POST',
                mode: 'cors'
            })

            // Remove the buttons, render the rejection sign
            const itemWrapper = actionsContainer.closest('.reservation-item')
            actionsContainer.remove()
            itemWrapper.insertAdjacentHTML('beforeend', `
                <div class="reservation-confirmed">
                    <img src="/images/cancelled.png" alt="confirmado">
                </div>
            `)
        } catch (_) {
            // Render back the buttons
            loader.removeAttribute('style')
            btnReject.removeAttribute('style')
            btnConfirm.removeAttribute('style')
            alert('Ha ocurrido un error.\nInténtalo de nuevo más tarde.')
        }
    }
}

const admin = new Administrator()