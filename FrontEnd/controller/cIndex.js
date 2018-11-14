var map;
var heatmap;
var marker;
var locationMarker;

/**
 * funcion para inicializar el mapa con todos sus componentes
 */
function initMap() {
    // creacion de una coordenada
    var myLatlng = new google.maps.LatLng(4.641578, -74.154355);
    // opciones del mapa,
    var myOptions = {
        zoom: 15,
        center: myLatlng
    };
    // instacia de mapa de google
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    // -------------------------------------------------------
    // pintar geolocalizacion
    // -------------------------------------------------------
    focusLocation(map);


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
    //añadir mapa de calor
    addHeatMapLayer(map);
    //añadir el boton de localizacion
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map, 'Center Map');

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
    var controlHealthDiv = document.createElement('div');
    var controlHealth = new CenterControl(controlHealthDiv, map, 'Health');
    controlHealthDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlHealthDiv);
    var controlSecurityDiv= document.createElement('div');
    var controlSecurity = new CenterControl(controlSecurityDiv, map, 'Security');
    controlSecurityDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlSecurityDiv);
    var controlAmbientDiv= document.createElement('div');
    var controlAmbient = new CenterControl(controlAmbientDiv, map, 'Ambient');
    controlAmbientDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlAmbientDiv);


}

/**
 * agregar el mapa de calor a un mapa
 *
 * @param {*} map mapa al cual se va a añadir el mapa de calor
 */
function addHeatMapLayer(map) {
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
    //datos de prueba a mostrar
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
/**
 * pintar el punto de localizacion del usuario
 * @param {*} mylat latitud donde se va a pintar punto de localizacion
 * @param {*} mylong longitud donde se va a pintar punto de localizacion
 */
function paintPoint(myPosition, map) {
    //crear simbolo de circulo para mostar en mapa
    var locationSimbol = {
        fillColor: '#4285F4',
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "white",
        scale: 5,
        fillOpacity: 1,
        strokeWeight: 1
    };
    if (locationMarker != null) {
        locationMarker.setMap(null);
    }
    //marcador para pintar la localizacion
    locationMarker = new google.maps.Marker({
        position: myPosition,
        map: map,
        icon: locationSimbol
    });
}
/**
 * actualiza la posicion del mapa al punto de localizacion
 * @param {*} map mapa el cual se vera afectado
 */
function focusLocation(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //crear una coordena
            var myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //pintar punto
            paintPoint(myPosition, map);
            //reestablecer el centro y el zoom en localizacion
            map.setCenter(myPosition);
            map.setZoom(15);
        });
    }
}

function CenterControl(controlDiv, map, text) {

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = text;
    controlUI.appendChild(controlText);

    //setup the click event listener: simply set the map on location
    controlUI.addEventListener('click', function () {
        focusLocation(map);
    });
}