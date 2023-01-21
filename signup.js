const form = document.getElementById('signup-form');
const nameInput = document.getElementById('signup-name');
const emailInput = document.getElementById('signup-email');

const submit_btn = document.getElementById('signup-submit-btn');
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

form.addEventListener('submit', signupUserForEmailList);

function signupUserForEmailList(event) {
    event.preventDefault();

    submit_btn.setAttribute('style', 'display:none;');
    submit_anim.removeAttribute('style');

    let userName = nameInput.value;
    let userEmail = emailInput.value;
    
    fStore.collection('mailing-list').get().then(querySnapshot => {
        let emailInList = false;
        querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.get('email') === userEmail) {
                emailInList = true;
            }
        })
        if (emailInList) {
            alert('Este email ya está en la lista');
            submit_anim.setAttribute('style', 'display:none;');
            submit_btn.removeAttribute('style');
        } else {
            fStore.collection('mailing-list').add({
                nombre: userName,
                email: userEmail,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                submit_anim.setAttribute('style', 'display:none;');
                submit_btn.removeAttribute('style');
                alert('La inscripción exitosa!');
                window.location.href = '/index.html';
            }).catch(() => {
                submit_anim.setAttribute('style', 'display:none;');
                submit_btn.removeAttribute('style');
                alert('Caramba!')
            });
        }
    });
}
