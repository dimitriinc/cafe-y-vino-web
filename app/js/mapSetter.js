
const map_container = document.getElementById('map')

const coords = [-16.39885635543751, -71.53528710495644]

map = L.map('map').setView(coords, 17)

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: ''
}).addTo(map)

L.marker(coords).addTo(map)

