const hero_image = document.querySelector('.hero__image');


hero_image.addEventListener('click', () => {

    if (window.pageYOffset === 0) {
        window.scrollTo({
            top: window.scrollY + window.innerHeight - 100,
            behavior: 'smooth'
        });
    }
});