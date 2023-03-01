
const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.mobile-nav-menu');
const body = document.querySelector('body');
const mobileNav = document.querySelectorAll('.slider-links');
const revealables = document.querySelectorAll('.revealable');
const dimitriinc = document.querySelector('#dimitriinc');
const dimiEmail = document.querySelector('#dimi_email');
const load_anim = document.querySelector('.load-anim');


window.onload = () => {

    load_anim.setAttribute('style', 'opacity: 0;')

        revealables.forEach(function(element) {
            element.classList.add('revealed');
        })
        dimitriinc.classList.add('emerged')

};

window.addEventListener('scroll', function() {
    if (this.document.documentElement.clientWidth < 769) {
        if (window.scrollY != 0) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    }
})

dimitriinc.addEventListener('click', function() {
    dimitriinc.classList.add('submerged')
    dimitriinc.classList.remove('emerged')
    dimiEmail.classList.add('emerged')
    dimiEmail.classList.remove('submerged')
})

dimiEmail.addEventListener('click', function() {
    dimiEmail.classList.add('submerged')
    dimitriinc.classList.add('emerged')
    dimiEmail.classList.remove('emerged')
    dimitriinc.classList.remove('submerged')
})


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