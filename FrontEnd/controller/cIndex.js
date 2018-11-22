/**
 * funcion para inicializar el mapa con todos sus componentes
 */
function initMap() {
    // creation of a coordinate
    var myLatlng = new google.maps.LatLng(4.641578, -74.154355);
    // map options,
    var myOptions = {
        zoom: 15,
        center: myLatlng
    };
    // google map instace
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    // -------------------------------------------------------
    // paint geolocation
    // -------------------------------------------------------
    focusLocation(map);
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    // creation of punctuation window
    // -----------------------------------------------------------
    var infowindow = new google.maps.InfoWindow({
        content: contentAsk
    });

    var messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });
    // -----------------------------------------------------------
    // add event at punctuation window
    // -----------------------------------------------------------
    google.maps.event.addListener(map, 'click', function (event) {
        if (marker != null) {
            marker.setMap(null);
        }
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        console.log(map);

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
            coordinate = marker.getPosition();
        });
    });
    // -----------------------------------------------------------
    // add heat map
    // -----------------------------------------------------------
    addHeatMapLayer(map);
    // -----------------------------------------------------------
    // add button of geolocation
    // -----------------------------------------------------------

    // Create the DIV to hold the control and call the CustomControl()
    // constructor passing in this DIV.
    var customControlDiv = document.createElement('div');
    var customControl = new CustomControl(customControlDiv, map, 'Center Map');
    customControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(customControlDiv);
    var controlHealthDiv = document.createElement('div');
    var controlHealth = new CustomControl(controlHealthDiv, map, 'Health');
    controlHealthDiv.index = 1;
    controlHealthDiv.addEventListener('click', function () {
        getValues('health');
    });
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlHealthDiv);
    var controlSecurityDiv = document.createElement('div');
    var controlSecurity = new CustomControl(controlSecurityDiv, map, 'Security');
    controlSecurityDiv.index = 1;
    controlSecurityDiv.addEventListener('click', function () {
        getValues('security');
    });
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlSecurityDiv);
    var controlAmbientDiv = document.createElement('div');
    var controlAmbient = new CustomControl(controlAmbientDiv, map, 'Ambient');
    controlAmbientDiv.index = 1;
    controlAmbientDiv.addEventListener('click', function () {
        getValues('ambient');
    });
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlAmbientDiv);

}

/**
 * add heat map to a map
 *
 * @param {*} map map to which the heat map will be added
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
    // cargar valores de seguridad por defecto al inicio
    getValues('security');
}
/**
 * paint the user's location point
 * @param {*} myPosition user's position
 * @param {*} map map to which the point will be added
 */
function paintPoint(myPosition, map) {
    //create circle symbol to show on map
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
    // marker to paint the location
    locationMarker = new google.maps.Marker({
        position: myPosition,
        map: map,
        icon: locationSimbol
    });
}
/**
 * updates the position of the map to the location point
 * @param {*} map map which will be updated
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

function saveData() {
    ratingIndicators = getIndicatorsRating();
    count = 0;
    for (var key in ratingIndicators) {
        if (ratingIndicators.hasOwnProperty(key)) {
            saveDataIndicator(indicators[count], ratingIndicators[key]);
            count++;
        }
    }
}

function saveDataIndicator(indicator, rate) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("divTest").innerHTML = 'sucess'; //this.responseText;
        }
    };
    xhttp.open("GET", "https://" + server + "/Heat_Map_Welfare/BackEnd/HeatMapWelfare/public/addCoordinate/lat=" + coordinate.lat() + "/lng=" + coordinate.lng() + "/indicator=" + indicator + "/score=" + rate, true);
    xhttp.send();
}

function getIndicatorsRating() {
    var ratingIndicators = {
        'healthRate': getRadioButtonSelectedValue(document.formHealth.health_star) * 20,
        'securityRate': getRadioButtonSelectedValue(document.formSecurity.security_star) * 20,
        'ambientRate': getRadioButtonSelectedValue(document.formAmbient.ambient_star) * 20
    };
    return ratingIndicators;
}

function getRadioButtonSelectedValue(ctrl) {
    for (i = 0; i < ctrl.length; i++)
        if (ctrl[i].checked) return ctrl[i].value;
}

function getValues(indicator) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            setDataHeatMap(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://" + server + "/Heat_Map_Welfare/BackEnd/HeatMapWelfare/public/getIndicators/" + indicator + "/true", true);
    xhttp.send();
}

function setDataHeatMap(dataJson) {
    var dataHeatMap = {
        max: 100,
        data: []
    };
    console.log(dataJson);
    for (const key in dataJson) {
        if (dataJson.hasOwnProperty(key)) {
            dataHeatMap.data.push(extractCoordinate(dataJson[key]));
        }
    }
    heatmap.setData(dataHeatMap);
}

function extractCoordinate(coordinate) {
    return {
        lat: coordinate.lat,
        lng: coordinate.lng,
        count: coordinate.pivot.score
    };
}
