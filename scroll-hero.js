const hero_image = document.querySelector('.hero__image');


hero_image.addEventListener('click', () => {
    window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: 'smooth'
    });
});