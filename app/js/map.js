/*
 * Google Map
 * */
// GoogleMaps on contact page
window.initMap = function () {
    var pin = '/images/point-min.png';

    if ($('#map')[0]){
        window.gMap = new google.maps.Map($('#map')[0], {
            center: {
                lat: 55.814170,
                lng: 37.691666
            },
            zoom: 17,
            disableDefaultUI: true,
            scrollwheel: false
        });

        var marker = new google.maps.Marker({
            position: {
                lat: 55.814170,
                lng: 37.694666
            },
            icon: {
                url:pin,
                size:new google.maps.Size(42, 37),
                scaledSize:new google.maps.Size(42, 37),
                anchor:new google.maps.Point(-10, -20)
            },
            map: window.gMap,
            title: 'г. Москва, ул. Краснобогатырская, д. 6, БЦ Villa Riva, оф. 204'
        });
    }
};