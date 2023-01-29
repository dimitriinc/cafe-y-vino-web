const form = document.getElementById('signup-form');
const nameInput = document.getElementById('signup-name');
const emailInput = document.getElementById('signup-email');

const submit_btn = document.getElementById('signup-submit-btn');
const submit_anim = document.getElementById('loader');

form.addEventListener('submit', signupUserForEmailList);

function signupUserForEmailList(event) {
    event.preventDefault();

    submit_btn.setAttribute('style', 'display:none;');
    submit_anim.removeAttribute('style');

    let userName = nameInput.value;
    let userEmail = emailInput.value;

    const msg = {
        name: userName, 
        email: userEmail
    }


    axios.post('https://0562-190-238-135-197.sa.ngrok.io/signup', msg)
        .then(response => {
            console.log(response);
            alert(response);
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.log(error);
            setTimeout(() => {
                submit_anim.setAttribute('style', 'display:none;');
                submit_btn.removeAttribute('style');
                alert('Caramba!');
            }, 3000);
        });
    
    // fStore.collection('mailing-list').get().then(querySnapshot => {
    //     let emailInList = false;
    //     querySnapshot.forEach(documentSnapshot => {
    //         if (documentSnapshot.get('email') === userEmail) {
    //             emailInList = true;
    //         }
    //     })
    //     if (emailInList) {
    //         alert('Este email ya está en la lista');
    //         submit_anim.setAttribute('style', 'display:none;');
    //         submit_btn.removeAttribute('style');
    //     } else {
    //         fStore.collection('mailing-list').add({
    //             nombre: userName,
    //             email: userEmail,
    //             timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //         }).then(() => {
    //             submit_anim.setAttribute('style', 'display:none;');
    //             submit_btn.removeAttribute('style');
    //             alert('La inscripción exitosa!');
    //             window.location.href = '/index.html';
    //         }).catch(() => {
    //             submit_anim.setAttribute('style', 'display:none;');
    //             submit_btn.removeAttribute('style');
    //             alert('Caramba!')
    //         });
    //     }
    // });
}
