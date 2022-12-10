const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');

btnHamburger.addEventListener('click', function() {
    if (header.classList.contains('open')) { // Hamburger closes
        body.classList.remove('noscroll');
        header.classList.remove('open');
        overlay.classList.add('slide-out');
        overlay.classList.remove('slide-in');
        // headerMenu.classList.add('has-fade');
        
    } else { // Hamburger opens
        body.classList.add('noscroll');
        header.classList.add('open');
        overlay.classList.add('slide-in');
        overlay.classList.remove('slide-out');
        // headerMenu.classList.remove('has-fade');
    }
})