const paxRange = document.getElementById('reserv-pax')
const paxDisplay = document.querySelector('.pax-value')

paxRange.value = 2
paxDisplay.innerHTML = paxRange.value

paxRange.addEventListener('input', function() {
    paxDisplay.innerHTML = this.value
})