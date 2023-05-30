const input_file = document.getElementById('file-pdf');
const input_button = document.querySelector('.input-file-receiver-btn');
const input_display = document.querySelector('.input-file-receiver-selected');
const select = document.querySelector('select');
const form_jobs = document.getElementById('form-jobs');
const jobs_name = document.getElementById('jobs-name');
const jobs_tel = document.getElementById('jobs-tel');
const jobs_carta = document.getElementById('jobs-carta');

const jobs_submit_btn = document.getElementById('jobs-submit');
const jobs_loader = document.getElementById('loader');

if (input_file.value !== '') {
    input_display.innerHTML = `<em>${input_file.files[0].name}</em>`;
}

if (select.value == '') {
    select.setAttribute('style', 'color:grey');
}
select.addEventListener('change', () => {
    select.setAttribute('style', 'color:#160b17')
});

input_button.addEventListener('click', () => {
    input_file.click();
});

input_file.addEventListener('change', () => {
    const file_name = input_file.files[0].name;
    const file_extension = file_name.split('.').pop().toLowerCase();

    if (file_extension === 'pdf') {
        input_display.innerHTML = `<em>${file_name}</em>`;
    } else {
        input_display.innerHTML = `<em>Por favor, selecciona un archivo PDF</em>`;
        input_file.value = '';
        return;
    }

    if (input_file.files[0].size > 5242880) {
        input_display.innerHTML = `<em>El tamaño no puede ser más de 5MB</em>`;
        input_file.value = '';
    }
});

form_jobs.addEventListener('submit', async event => {
    event.preventDefault()

    if (input_file.value == '') {

        if (input_display.innerHTML === '') {
            input_display.innerHTML = '<em>El archivo no está seleccionado</em>';
        }
        return;
    }

    renderSubmitAnimation()

    const formData = new FormData(form_jobs)
    console.dir(formData)

    try {
        await fetch('https://15e9-190-238-135-197.ngrok-free.app/job-application', {
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
})

function renderSubmitAnimation() {
    jobs_submit_btn.setAttribute('style', 'display:none;')
    jobs_loader.removeAttribute('style')
}

function renderSubmitButton() {
    jobs_loader.setAttribute('style', 'display:none;')
    jobs_submit_btn.removeAttribute('style')
}