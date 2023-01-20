const form_element = document.getElementById('reserv-form');
const name_element = document.getElementById('reserv-name');
const tel_element = document.getElementById('reserv-tel');
const email_element = document.getElementById('reserv-email');
const comment_element = document.getElementById('reserv-comment');
let pax_element;
if (document.documentElement.clientWidth > 769) {
    pax_element = document.getElementById('reserv-pax-desk');
    pax_element.setAttribute('required', 'true');
} else {
    pax_element = document.getElementById('reserv-pax-mobile');
}

const fecha_element = document.getElementById('reserv-date');
const hour_element = document.getElementById('reserv-hour');

const submit_btn = document.getElementById('reserv-btn');
const submit_anim = document.getElementById('loader');

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

form_element.addEventListener('submit', event => {
    event.preventDefault();

    submit_btn.setAttribute('style', 'display:none;');
    submit_anim.removeAttribute('style');

    let userName = name_element.value;
    let userTel = tel_element.value;
    let userEmail = email_element.value;
    let comment = comment_element.value;
    if (comment === '') {
        comment = 'sin comentario';
    }
    let pax = pax_element.value;
    let date = String(fecha_element.value);
    let hour = hour_element.value;

    fStore.collection(`reservas/${date}/reservas`).add({
        nombre: userName,
        telefono: userTel,
        email: userEmail,
        comentario: comment,
        pax: pax,
        fecha: date,
        hora: hour,
        confirmado: false
    }).catch(event => {
        submit_anim.setAttribute('style', 'display:none;');
        submit_btn.removeAttribute('style');
        alert('Caramba!');
    }).then(event => {
        submit_anim.setAttribute('style', 'display:none;');
        submit_btn.removeAttribute('style');
        alert('La solicitud está enviada!');
        window.location.href = '/index.html';
    });
});