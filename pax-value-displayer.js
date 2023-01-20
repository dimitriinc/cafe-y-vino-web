const pax_range = document.getElementById('reserv-pax-mobile');
const pax_display = document.querySelector('.pax-value');

pax_range.value = 2;
pax_display.innerHTML = pax_range.value;

pax_range.addEventListener('input', function() {
    pax_display.innerHTML = this.value;
})