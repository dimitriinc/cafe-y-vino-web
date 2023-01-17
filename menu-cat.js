const categories = document.querySelectorAll('.menu-category');
const container = document.querySelector('.menu-categories-container');
const vinos_container = document.querySelector('.vinos-container');
const vino_categories = document.querySelectorAll('.vino-category');
const items_container = document.querySelector('.carousel');


function resetActive() {
    categories.forEach(function(element) {
        element.classList.remove('active');
    })
}

function resetVinosActive() {
    vino_categories.forEach(function(element) {
        element.classList.remove('active');
    })
}

vino_categories.forEach(function(element) {
    element.addEventListener('click', function() {
        resetVinosActive();
        element.classList.add('active');
    })
})

categories.forEach(function(element) {

    element.addEventListener('click', function() {

        if (element.innerHTML === 'Vinos') {
            vinos_container.classList.remove('hidden');
            vinos_container.classList.add('visible');
            items_container.classList.add('translated');
        } else {
            vinos_container.classList.remove('visible');
            vinos_container.classList.add('hidden');
            items_container.classList.remove('translated');
            resetVinosActive();
        }
        resetActive();
        element.classList.add('active')
    })



    // if (element.innerHTML === 'Vinos') {
    //     element.addEventListener('click', function() {
    //         resetActive();
    //         element.classList.add('active')
    //     })
    //     vinos_container.classList.remove('hidden');
    //     vinos_container.classList.add('visible');
    // } else {
    //     element.addEventListener('click', function() {
    //         resetActive();
    //         element.classList.add('active')
    //     })
    //     vinos_container.classList.remove('visible');
    //     vinos_container.classList.add('hidden');
    // }
    
})
