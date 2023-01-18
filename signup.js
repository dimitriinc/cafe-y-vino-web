const form = document.getElementById('signup-form');
const nameInput = document.getElementById('signup-name');
const emailInput = document.getElementById('signup-email');

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
    let userName = nameInput.value;
    let userEmail = emailInput.value;
    console.log(`name: ${userName}`);
    console.log(`email: ${userEmail}`);
    fStore.collection('mailing-list').add({
        nombre: userName,
        email: userEmail
    }).then(event => {
        alert('La inscripción exitosa!')
        window.location.href = '/index.html'
        console.log('user added to the mail list');
    }).catch(event => {
        alert('Caramba!')
    });

}
