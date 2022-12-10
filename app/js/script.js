const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelectorAll('.mobile-nav-menu');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');

btnHamburger.addEventListener('click', function() {
    if (header.classList.contains('open')) { // Hamburger closes
        body.classList.remove('noscroll');
        header.classList.remove('open');
        overlay.forEach(function(element) {
            element.classList.add('slide-out');
            element.classList.remove('slide-in');
        })
        // headerMenu.classList.add('has-fade');
        
    } else { // Hamburger opens
        body.classList.add('noscroll');
        header.classList.add('open');
        overlay.forEach(function(element) {
            element.classList.add('slide-in');
            element.classList.remove('slide-out');
        })
        
        // headerMenu.classList.remove('has-fade');
    }
})