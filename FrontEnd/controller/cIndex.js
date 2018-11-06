window.onload = function () {

};
var map;
var heatmap;
var marker;
var contentAsk = '<table><tr><td>Health:</td><td><form><p class="clasificacion"><input id="radio1" type="radio" name="estrellas" value="5"><!--' +
    '--><label for="radio1">★</label><!--' +
    '--><input id="radio2" type="radio" name="estrellas" value="4"><!--' +
    '--><label for="radio2">★</label><!--' +
    '--><input id="radio3" type="radio" name="estrellas" value="3"><!--' +
    '--><label for="radio3">★</label><!--' +
    '--><input id="radio4" type="radio" name="estrellas" value="2"><!--' +
    '--><label for="radio4">★</label><!--' +
    '--><input id="radio5" type="radio" name="estrellas" value="1"><!--' +
    '--><label for="radio5">★</label></p></form></td></tr><tr><td>security:</td><td><form><p class="clasificacion"><input id="radio1" type="radio" name="estrellas" value="5"><!--' +
    '--><label for="radio1">★</label><!--' +
    '--><input id="radio2" type="radio" name="estrellas" value="4"><!--' +
    '--><label for="radio2">★</label><!--' +
    '--><input id="radio3" type="radio" name="estrellas" value="3"><!--' +
    '--><label for="radio3">★</label><!--' +
    '--><input id="radio4" type="radio" name="estrellas" value="2"><!--' +
    '--><label for="radio4">★</label><!--' +
    '--><input id="radio5" type="radio" name="estrellas" value="1"><!--'+
'--><label for="radio5">★</label></p></form></td></tr><tr><td>Ambient:</td><td><form><p class="clasificacion"><input id="radio1" type="radio" name="estrellas" value="5"><!--' +
'--><label for="radio1">★</label><!--' +
'--><input id="radio2" type="radio" name="estrellas" value="4"><!--' +
'--><label for="radio2">★</label><!--' +
'--><input id="radio3" type="radio" name="estrellas" value="3"><!--' +
'--><label for="radio3">★</label><!--' +
'--><input id="radio4" type="radio" name="estrellas" value="2"><!--' +
'--><label for="radio4">★</label><!--' +
'--><input id="radio5" type="radio" name="estrellas" value="1"><!--' +
'--><label for="radio5">★</label></p></form></td></tr><tr><td></td><td><input type="button" value="Save" onclick="saveData()"></td></tr></table>';

function initMap() {
    // don't forget to add gmaps-heatmap.js
    var myLatlng = new google.maps.LatLng(4.641578, -74.154355);
    // map options,
    var myOptions = {
        zoom: 15,
        center: myLatlng
    };
    // standard map
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    // -------------------------------------------------------
    // pintar geolocalizacion
    // -------------------------------------------------------
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            doStuff(position.coords.latitude, position.coords.longitude);
        });
    }


    // -----------------------------------------------------------

    var infowindow = new google.maps.InfoWindow({
        content: contentAsk
    });

    var messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function (event) {
        if (marker != null) {
            marker.setMap(null);
        }
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        })
        console.log(map);


        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    });
    // -------------------------------------------------------------

    // heatmap layer
    heatmap = new HeatmapOverlay(map, {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": 15,
        "maxOpacity": 1,
        // scales the radius based on map zoom
        "scaleRadius": false,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries 
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": false,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
    });


    var testData = {
        max: 8,
        data: [{
                lat: 4.637601,
                lng: -74.150478,
                count: 8
            }, {
                lat: 4.641578,
                lng: -74.154355,
                count: 1
            },
            {
                lat: 4.635590,
                lng: -74.155276,
                count: 5
            }
        ]
    };
    heatmap.setData(testData);
}

function doStuff(mylat, mylong) {
    var circle = new google.maps.Circle({
        center: new google.maps.LatLng(mylat, mylong),
        fillcolor: 'blue',
        fillOpacity: 0.7,
        radius: 20,
        map: map,
        clickable: false,
        strokeColor: 'white',
        strokeOpacity: 0.6
    });

}