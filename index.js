let navLinks = document.getElementsByClassName('navItem');
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
        alert("Hello");
    });
}