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

input_file.addEventListener('change', (e) => {
    let file_name = input_file.files[0].name;
    let file_extension = file_name.split('.').pop().toLowerCase();

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

form_jobs.addEventListener('submit', (event) => {
    event.preventDefault();

    if (input_file.value == '') {

        console.log('input value is empty')
        if (input_display.innerHTML === '') {
            input_display.innerHTML = '<em>El archivo no está seleccionado</em>';
        }
        // input_display.innerHTML = 'El archivo no está seleccionado';
        return;
    }

    jobs_submit_btn.setAttribute('style', 'display:none;');
    jobs_loader.removeAttribute('style');

    let userName = jobs_name.value;
    let userTel = jobs_tel.value;
    let position = select.value;
    let cover_letter = jobs_carta.value;
    let cv_file = input_file.files[0];

    let form_data = new FormData();
    form_data.append('name', userName);
    form_data.append('tel', userTel);
    form_data.append('position', position);
    form_data.append('letter', cover_letter);
    form_data.append('cv', cv_file);

    axios.post('https://0562-190-238-135-197.sa.ngrok.io/job-application', form_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            console.log(response);
            alert('Gracias por tu solicitud! Nos contactaremos pronto.');
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.log(error);
            setTimeout(() => {
                jobs_loader.setAttribute('style', 'display:none;');
                jobs_submit_btn.removeAttribute('style');
                alert('Caramba!');
                input_display.innerHTML = '';
            }, 3000);
        });
    
    input_file.value = '';
});