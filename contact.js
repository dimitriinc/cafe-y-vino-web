const contact_form = document.getElementById('form-contact');
const contact_name = document.getElementById('contact-name');
const contact_msg = document.getElementById('contact-msg');
const contact_email = document.getElementById('contact-email');
const contact_btn = document.getElementById('contact-submit');
const contact_loader = document.getElementById('loader');


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

    const msg = {
        name: userName,
        email: userEmail,
        msg: userMsg
    }

    console.log(`name: ${userName}\nemail: ${userEmail}\nmessage: ${userMsg}`)

    axios.post('https://d4f3-190-238-135-197.sa.ngrok.io/contact-msg', msg)
        .then(response => {
            console.log(response);
            alert('Gracias por tu mensaje!');
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.log(error);
            setTimeout(() => {
                contact_loader.setAttribute('style', 'display:none;');
                contact_btn.removeAttribute('style');
                alert('Caramba!');
            }, 3000);
        });
})