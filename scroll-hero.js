const hero_image = document.querySelector('.hero__image');
const main_text = document.querySelector('.main-text')

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