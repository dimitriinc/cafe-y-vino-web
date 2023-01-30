const form_element = document.getElementById('reserv-form');
const name_element = document.getElementById('reserv-name');
const tel_element = document.getElementById('reserv-tel');
const email_element = document.getElementById('reserv-email');
const comment_element = document.getElementById('reserv-comment');
const pax_element = document.getElementById('reserv-pax');
const fecha_element = document.getElementById('reserv-date');
const hour_element = document.getElementById('reserv-hour');

const submit_btn = document.getElementById('reserv-btn');
const submit_anim = document.getElementById('loader');

form_element.addEventListener('submit', event => {
    event.preventDefault();

    submit_btn.setAttribute('style', 'display:none;');
    submit_anim.removeAttribute('style');

    if (fecha_element.value === '') {
        alert('Por favor, escoge una fecha.');
        submit_anim.setAttribute('style', 'display:none;');
        submit_btn.removeAttribute('style');
        return;
    }

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

    const msg = {
        name: userName,
        tel: userTel,
        email: userEmail,
        comment: comment,
        pax: pax,
        date: date,
        hour: hour
    }

    axios.post('https://d4f3-190-238-135-197.sa.ngrok.io/reservations-request', msg)
        .then(response => {
            console.log(response);
            alert('La solicitud está enviada!');
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
});