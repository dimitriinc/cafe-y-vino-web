
// function initMap() {
//     let myLatLng = {lat: -16.398547309336884, lng: -71.53536741850829};

//     let map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 12,
//         center: myLatLng
//     });

//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         title: 'Café y Vino'
//     });
// }

// const map = document.querySelector('.gmap')
// const animation = document.querySelector('.gmap-animation')
const map_container = document.getElementById('map')

const coords = [-16.39871198765061, -71.53587167377633]

map = L.map('map').setView(coords, 20)

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

L.marker(coords).addTo(map)

// map.style.opacity = 0

// map.addEventListener('load', () => {
//     animation.style.opacity = 0
//     map.style.opacity = 1
// })