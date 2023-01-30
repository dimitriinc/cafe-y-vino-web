// AIzaSyA9ePf-V2c7Ib1U2ajdleGDft8kr12qguw

// -16.398547309336884, -71.53536741850829
function initMap() {
    let myLatLng = {lat: -16.398547309336884, lng: -71.53536741850829};

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Café y Vino'
    });
}