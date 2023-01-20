const form_element = document.getElementById('reserv-form');
const name_element = document.getElementById('reserv-name');
const tel_element = document.getElementById('reserv-tel');
const email_element = document.getElementById('reserv-email');
const comment_element = document.getElementById('reserv-comment');
const pax_desk_element = document.getElementById('reserv-pax-desk');
const pax_mobile_element = document.getElementById('reserv-pax-mobile');
const fecha_element = document.getElementById('reserv-date');
const hour_element = document.getElementById('reserv-hour');

form_element.addEventListener('submit', event => {
    event.preventDefault();
    let userName = name_element.value;
    let userTel = tel_element.value;
    let userEmail = email_element.value;
    let comment = comment_element.value;
    if (comment === '') {
        comment = 'sin comentario';
    }

    console.log(`the value of the pax element: ${pax_desk_element.value}`)
    if (pax_desk_element.value === '') {
        console.log('pax element has an empty string as value')
    }
    let pax;
    if (pax_desk_element.value === undefined || pax_desk_element.value === null) {
        pax = pax_mobile_element.value;
    } else {
        pax = pax_desk_element.value;
    }

    let date = fecha_element.value;
    let hour = hour_element.value;

    console.log(`name: ${userName}\ntel: ${userTel}\nemail: ${userEmail}\ncomment: ${comment}\npax: ${pax}\ndate:${date}\nhour: ${hour}`);
});