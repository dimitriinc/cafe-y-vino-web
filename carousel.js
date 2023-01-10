document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.carousel');
    let menu_categories = document.querySelector('.categories-carousel .carousel');
    let instances = M.Carousel.init(elems, {
        
    });
    let categories_instances = M.Carousel.init(menu_categories, {
        padding: 50,
        dist: -50,
        shift: 20
    })
})