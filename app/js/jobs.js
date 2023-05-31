const inputFileHidden = document.getElementById('file-pdf')
const inputButton = document.querySelector('.input-file-receiver-btn')
const inputDisplay = document.querySelector('.input-file-receiver-selected')
const jobPositionSelector = document.querySelector('select')
const formJobs = document.getElementById('form-jobs')

const jobsSubmitButton = document.getElementById('jobs-submit')
const jobsSubmitAnimation = document.getElementById('loader')

function renderSubmitAnimation() {
    jobsSubmitButton.setAttribute('style', 'display:none;')
    jobsSubmitAnimation.removeAttribute('style')
}

function renderSubmitButton() {
    jobsSubmitAnimation.setAttribute('style', 'display:none;')
    jobsSubmitButton.removeAttribute('style')
}

class Recruiter {

    constructor() {
        this._checkFileSelected()
        this._setPositionSelectorColor()
        this._addEventListeners()
    }

    _checkFileSelected() {
        if (inputFileHidden.value !== '') {
            inputDisplay.innerHTML = `<em>${inputFileHidden.files[0].name}</em>`
        }
    }

    _setPositionSelectorColor() {
        if (jobPositionSelector.value == '') {
            jobPositionSelector.setAttribute('style', 'color:grey')
        }
    }

    _addEventListeners() {

        jobPositionSelector.addEventListener('change', () => {
            jobPositionSelector.setAttribute('style', 'color:#160b17')
        })

        inputButton.addEventListener('click', () => {
            inputFileHidden.click()
        })

        inputFileHidden.addEventListener('change', this._onFileSelectedChange)

        formJobs.addEventListener('submit', this._submitApplication)
    }

    _onFileSelectedChange() {
        const fileName = inputFileHidden.files[0].name
        const fileExtension = fileName.split('.').pop().toLowerCase()
    
        if (fileExtension === 'pdf') {
            inputDisplay.innerHTML = `<em>${fileName}</em>`
        } else {
            inputDisplay.innerHTML = `<em>Por favor, selecciona un archivo PDF</em>`
            inputFileHidden.value = ''
            return
        }
    
        if (inputFileHidden.files[0].size > 5242880) {
            inputDisplay.innerHTML = `<em>El tamaño no puede ser más de 5MB</em>`
            inputFileHidden.value = ''
        }
    }

    async _submitApplication(event) {
        event.preventDefault()

        if (inputFileHidden.value == '') {
    
            if (inputDisplay.innerHTML === '') {
                inputDisplay.innerHTML = '<em>El archivo no está seleccionado</em>'
            }
            return
        }
    
        renderSubmitAnimation()
    
        const formData = new FormData(formJobs)
    
        try {
            await fetch(`https://2ee1-190-238-135-197.ngrok-free.app/job-application`, {
                method: 'POST',
                body: formData
            })

            alert('Gracias por tu solicitud! Nos contactaremos pronto.')
            window.location.href = '/index.html'
        } catch (_) {
            setTimeout(() => {
                renderSubmitButton()
                alert('Lo sentimos, ha ocurrido un error al procesar su solicitud.\nPor favor, inténtelo de nuevo más tarde.')
            }, 2000)
        }
    }
}

new Recruiter()