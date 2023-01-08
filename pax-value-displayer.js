const input = document.getElementById('pax-input');
const output = document.querySelector('.pax-value');

input.addEventListener('input', function() {
    output.innerHTML = this.ariaValueMax;
})