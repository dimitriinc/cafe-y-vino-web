const contact_form = document.getElementById('form-contact');
const contact_name = document.getElementById('contact-name');
const contact_msg = document.getElementById('contact-msg');
const contact_email = document.getElementById('contact-email');
const contact_btn = document.getElementById('contact-submit');
const contact_loader = document.getElementById('loader');


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

contact_btn.addEventListener('click', () => {
    
})

contact_loader.addEventListener('click', () => {
    contact_loader.setAttribute('style', 'display:none;');
    contact_btn.removeAttribute('style');
})

contact_form.addEventListener('submit', event => {
    event.preventDefault();

    contact_btn.setAttribute('style', 'display:none;');
    contact_loader.removeAttribute('style');

    let userName = contact_name.value;
    let userMsg = contact_msg.value;
    let userEmail = contact_email.value;

    fStore.collection('mensajes').add({
        nombre: userName,
        email: userEmail,
        mensaje: userMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        contact_loader.setAttribute('style', 'display:none;');
        contact_btn.removeAttribute('style');
        alert('Gracias por tu mensaje!');
        window.location.href = '/index.html';
    }).catch(() => {
        contact_loader.setAttribute('style', 'display:none;');
        contact_btn.removeAttribute('style');
        alert('Caramba!');
    })
})