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


    axios.post('https://d4f3-190-238-135-197.sa.ngrok.io/signup', msg)
        .then(response => {
            if (response.status === 201) {
                alert(response.data);
                submit_anim.setAttribute('style', 'display:none;');
                submit_btn.removeAttribute('style');
            } else {
                alert(response.data);
                window.location.href = '/index.html';
            }
        })
        .catch(error => {
            setTimeout(() => {
                submit_anim.setAttribute('style', 'display:none;');
                submit_btn.removeAttribute('style');
                alert('Lo sentimos, ha ocurrido un error al procesar su solicitud.\nPor favor, inténtelo de nuevo más tarde.');
            }, 3000);
        });
}
