
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

const coords = [-16.39885635543751, -71.53528710495644]

map = L.map('map').setView(coords, 17)

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: ''
}).addTo(map)

L.marker(coords).addTo(map)

// map.style.opacity = 0

// map.addEventListener('load', () => {
//     animation.style.opacity = 0
//     map.style.opacity = 1
// })

// 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
