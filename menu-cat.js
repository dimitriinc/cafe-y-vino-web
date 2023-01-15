const categories = document.querySelectorAll('.menu-category');
const container = document.querySelector('.menu-categories-container');


function resetActive() {
    categories.forEach(function(element) {
        element.classList.remove('active');
    })
}

categories.forEach(function(element) {
    element.addEventListener('click', function() {
        resetActive();
        element.classList.add('active')
    })
})