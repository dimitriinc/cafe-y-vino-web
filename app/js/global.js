
const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const headerSlicer = document.querySelector('.header-slicer');
const overlay = document.querySelector('.mobile-nav-menu');
const body = document.querySelector('body');
const mobileNav = document.querySelectorAll('.slider-links');
// const revealables = document.querySelectorAll('.revealable');
const dimitriinc = document.querySelector('#dimitriinc');
const dimiEmail = document.querySelector('#dimi_email');
const allSections = document.querySelectorAll('section')

window.onload = () => {

    // revealables.forEach(function(element) {
    //     element.classList.add('revealed');
    // })
    dimitriinc.classList.add('emerged')

};

// Observer to smoothly reveal sections
const reveal = function(entries, observer) {
    const [entry] = entries
    if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
    }
    
}
const revealOptions = {
    root: null,
    threshold: .15
}
const revealObserver = new IntersectionObserver(reveal, revealOptions)

allSections.forEach( section => {
    section.classList.add('revealable')
    revealObserver.observe(section)
})

// Observer to make the header sticky on tablets and phones
const obsCallback = function(entries) {
    if (document.documentElement.clientWidth < 769) {
        const [entry] = entries
        if (!entry.isIntersecting) {
            header.classList.add('scroll')
        } else {
            header.classList.remove('scroll')
        }
    }
}
const obsOptions = {
    root: null,
    threshold: 0,
}
const observer = new IntersectionObserver(obsCallback, obsOptions)
observer.observe(headerSlicer)



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