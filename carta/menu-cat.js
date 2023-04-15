const categories = document.querySelectorAll('.menu-category');
const container = document.querySelector('.menu-categories-container');
const vinos_container = document.querySelector('.vinos-container');
const vino_categories = document.querySelectorAll('.vino-category');
const items_container = document.querySelector('.carousel');
const carousel_container = document.querySelector('.carousel-container')


function resetActive() {
    categories.forEach(element => element.classList.remove('active'))
}

function resetVinosActive() {
    vino_categories.forEach(element => element.classList.remove('active'))
}

vino_categories.forEach(element => element.addEventListener('click', () => {
        resetVinosActive()
        element.classList.add('active')
    })
)

categories.forEach(element => element.addEventListener('click', () => {

        if (element.innerHTML === 'Vinos') {
            vinos_container.classList.remove('hidden');
            vinos_container.classList.add('visible');
            carousel_container.classList.add('translated');
        } else {
            vinos_container.classList.remove('visible');
            vinos_container.classList.add('hidden');
            carousel_container.classList.remove('translated');
            resetVinosActive();
        }
        resetActive();
        element.classList.add('active')
    })
)
