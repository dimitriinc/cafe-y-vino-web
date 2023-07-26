const form_element = document.getElementById('reserv-form')
const inputTime = document.querySelector('input[type="time"]')
const submit_btn = document.getElementById('reserv-btn')
const submit_anim = document.getElementById('loader')

const renderSubmitAnimation = function() {
    submit_btn.setAttribute('style', 'display:none;')
    submit_anim.removeAttribute('style')
}

const renderSubmitButton = function() {
    submit_anim.setAttribute('style', 'display:none;')
    submit_btn.removeAttribute('style')
}

inputTime.addEventListener('input', () => {
    if (inputTime.value < '14:00' || inputTime.value > '21:00') {
      inputTime.setCustomValidity('Por favor ingresa la hora entre 2:00 PM y 9:00 PM');
    } else {
      inputTime.setCustomValidity('');
    }
})

form_element.addEventListener('submit', event => {
    event.preventDefault()

    sessionStorage.clear()

    renderSubmitAnimation()

    // Convert form values into an object
    const arrOfValuesArrs = [...new FormData(form_element)]
    const formData = Object.fromEntries(arrOfValuesArrs)

    // Abort if the date is empty (it's Sunday)
    if (!formData.date) {
        alert('Por favor, escoge una fecha.')
        renderSubmitButton()
        return;
    }

    formData.comment = formData.comment || 'sin comentario'

    // Create a timestamp of the presumed arrival (for ordering of reservation in the admin page)
    const dateTimeString = `${formData.date.split('/').reverse().join('-')}T${formData.hour}:00`
    const dateObj = new Date(dateTimeString)
    formData.arrivalTimestamp = dateObj.getTime()

    fetch(`https://5222-190-238-135-197.ngrok-free.app/make-reservation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(async response => {
        const data = await response.text()
        if (response.status === 201) {
            alert(data)
            renderSubmitButton()
        } else {
            alert(data)
            window.location.href = '/index.html'
        }
    })
    
    .catch(() => {
        setTimeout(() => {
            renderSubmitButton()
            alert('Lo sentimos, ha ocurrido un error al procesar su solicitud.\nPor favor, inténtelo de nuevo más tarde.')
        }, 2000 );
    });
});