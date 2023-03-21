const hero_image = document.querySelector('.hero__image');
const main_text = document.querySelector('.main-text')
const navigation = document.querySelector('nav')
const header_spacer = document.querySelector('.header-spacer')

const coords = main_text.getBoundingClientRect()

hero_image.addEventListener('click', () => {

    if (window.pageYOffset === 0) {
        if (document.documentElement.clientWidth > 769) {
            main_text.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        } else {
            window.scrollTo({
                left: coords.left + window.pageXOffset,
                top: coords.top + window.pageYOffset - 160,
                behavior: 'smooth'
            });
        }
    }
});

if (document.documentElement.clientWidth > 769) {
    const navObserver = new IntersectionObserver(entries => {
        const [entry] = entries
        if (!entry.isIntersecting) {
            navigation.classList.add('sticky')
        } else {
            navigation.classList.remove('sticky')
        }
    })
    navObserver.observe(header_spacer)
}

