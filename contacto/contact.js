const contact_form = document.getElementById('form-contact')
const contact_btn = document.getElementById('contact-submit')
const contact_loader = document.getElementById('loader')


contact_form.addEventListener('submit', async event => {
    event.preventDefault()

    renderSubmitAnimation()

    const arrOfValuesArrs = [...new FormData(contact_form)]
    const formData = Object.fromEntries(arrOfValuesArrs)

    try {
        await fetch('https://15e9-190-238-135-197.ngrok-free.app/contact-msg', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        alert('Gracias por tu mensaje!')
        window.location.href = '/index.html'
    } catch (_) {
        setTimeout(() => {
            renderSubmitButton()
            alert('Lo sentimos, ha ocurrido un error al procesar su mensaje.\nPor favor, inténtelo de nuevo más tarde.')
        }, 2000)
    }
})

function renderSubmitAnimation() {
    contact_btn.setAttribute('style', 'display:none;')
    contact_loader.removeAttribute('style')
}

function renderSubmitButton() {
    contact_loader.setAttribute('style', 'display:none;')
    contact_btn.removeAttribute('style')
}