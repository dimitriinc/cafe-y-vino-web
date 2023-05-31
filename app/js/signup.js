const form = document.getElementById('signup-form')
const submit_btn = document.getElementById('signup-submit-btn')
const submit_anim = document.getElementById('loader')

form.addEventListener('submit', signupUserForEmailList)

async function signupUserForEmailList(event) {
    event.preventDefault()

    renderSubmitAnimation()

    const arrOfValuesArrs = [...new FormData(form)]
    const formData = Object.fromEntries(arrOfValuesArrs)

    try {
        const response = await fetch('https://15e9-190-238-135-197.ngrok-free.app/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const text = await response.text()

        if (response.status === 201) {
            alert(text)
            renderSubmitButton()
        } else {
            alert(text)
            window.location.href = '/index.html'
        }
        
    } catch (_) {
        setTimeout(() => {
            renderSubmitButton()
            alert('Lo sentimos, ha ocurrido un error al procesar su solicitud.\nPor favor, inténtelo de nuevo más tarde.')
        }, 2000)
    }
}

function renderSubmitAnimation() {
    submit_btn.setAttribute('style', 'display:none;')
    submit_anim.removeAttribute('style')
}

function renderSubmitButton() {
    submit_anim.setAttribute('style', 'display:none;')
    submit_btn.removeAttribute('style')
}
