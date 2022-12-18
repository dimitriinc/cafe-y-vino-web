const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.mobile-nav-menu');
const body = document.querySelector('body');
const mobileNav = document.querySelectorAll('.slider-links');
const revealables = document.querySelectorAll('.revealable');

window.onload = (event) => {
    revealables.forEach(function(element) {
        element.classList.add('revealed');
    })
};

btnHamburger.addEventListener('click', function() {
    if (header.classList.contains('open')) { // Hamburger closes
        body.classList.remove('noscroll');
        header.classList.remove('open');
        overlay.classList.add('slide-out');
        overlay.classList.remove('slide-in');
        mobileNav.forEach(function(element) {
            element.classList.add('fade-out');
            element.classList.remove('fade-in');
        })
        
        
    } else { // Hamburger opens
        body.classList.add('noscroll');
        header.classList.add('open');
        overlay.classList.add('slide-in');
        overlay.classList.remove('slide-out');
        mobileNav.forEach(function(element) {
            element.classList.add('fade-in');
            element.classList.remove('fade-out');
        })
        
    }
})