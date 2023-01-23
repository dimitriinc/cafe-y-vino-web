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

const firebaseConfig = {
    apiKey: "AIzaSyC8URyjiTFzhzOwuJYtftqN0sFaDGzj9rc",
    authDomain: "cafe-y-vino.firebaseapp.com",
    databaseURL: "https://cafe-y-vino-default-rtdb.firebaseio.com",
    projectId: "cafe-y-vino",
    storageBucket: "cafe-y-vino.appspot.com",
    messagingSenderId: "1096226926741",
    appId: "1:1096226926741:web:d5c23cb2bbba3fb4796b9c",
    measurementId: "G-D0VKYKE89E"
};

firebase.initializeApp(firebaseConfig);
const fStore = firebase.firestore();

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
        return;
    }

    jobs_submit_btn.setAttribute('style', 'display:none;');
    jobs_loader.removeAttribute('style');

    let userName = jobs_name.value;
    let userTel = jobs_tel.value;
    let position = select.value;
    let carta = jobs_carta.value;
    let cv_file = input_file.files[0];

    console.log(`CV file: ${cv_file}`);

    fStore.collection('aplicaciones_de_trabajo').add({
        nombre: userName,
        telefono: userTel,
        posicion: position,
        carta: carta
    }).then(() => {
        jobs_loader.setAttribute('style', 'display:none;');
        jobs_submit_btn.removeAttribute('style');
        alert('Gracias por tu aplicaciòn! Nos contactaremos pronto.')
        window.location.href = '/index.html';
    }).catch(() => {
        jobs_loader.setAttribute('style', 'display:none;');
        jobs_submit_btn.removeAttribute('style');
        alert('Caramba!');
    });
});