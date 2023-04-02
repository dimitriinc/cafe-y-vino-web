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

    sessionStorage.clear();

    submit_btn.setAttribute('style', 'display:none;');
    submit_anim.removeAttribute('style');

    if (fecha_element.value === '') {
        alert('Por favor, escoge una fecha.');
        submit_anim.setAttribute('style', 'display:none;');
        submit_btn.removeAttribute('style');
        return;
    }

    const userName = name_element.value;
    const userTel = tel_element.value;
    const userEmail = email_element.value;
    let comment = comment_element.value;
    if (comment === '') {
        comment = 'sin comentario';
    }
    const pax = pax_element.value;
    const date = String(fecha_element.value);
    const hour = hour_element.value;

    const dateTimeString = `${date.split('/').reverse().join('-')}T${hour}:00`
    const dateObj = new Date(dateTimeString)
    const arrivalTimestamp = dateObj.getTime()

    const msg = {
        name: userName,
        phone: userTel,
        email: userEmail,
        comment: comment,
        pax: pax,
        date: date,
        hour: hour,
        arrivalTimestamp: arrivalTimestamp
    }

    console.dir(dateObj);
    console.log(arrivalTimestamp);



    fetch(`https://6ca6-190-238-135-197.sa.ngrok.io/make-reservation`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
    })
    .then(async response => {
        const data = await response.text();
        if (response.status === 201) {
            alert(data);
            submit_anim.setAttribute('style', 'display:none;');
            submit_btn.removeAttribute('style');
        } else {
            alert(data);
            window.location.href = '/index.html';
        }
    })
    
    .catch(error => {
        setTimeout(() => {
            submit_anim.setAttribute('style', 'display:none;');
            submit_btn.removeAttribute('style');
            alert('Lo sentimos, ha ocurrido un error al procesar su solicitud.\nPor favor, inténtelo de nuevo más tarde.');
        }, 3000 );
    });
});