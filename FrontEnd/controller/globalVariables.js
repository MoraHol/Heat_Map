var contentAsk = '<table><tr><td>Health:</td><td><form name="formHealth"><p class="clasificacion"><input id="radio1" type="radio" name="health_star" value="5"><!--' +
    '--><label for="radio1">★</label><!--' +
    '--><input id="radio2" type="radio" name="health_star" value="4"><!--' +
    '--><label for="radio2">★</label><!--' +
    '--><input id="radio3" type="radio" name="health_star" value="3"><!--' +
    '--><label for="radio3">★</label><!--' +
    '--><input id="radio4" type="radio" name="health_star" value="2"><!--' +
    '--><label for="radio4">★</label><!--' +
    '--><input id="radio5" type="radio" name="health_star" value="1"><!--' +
    '--><label for="radio5">★</label></p></form></td></tr><tr><td>security:</td><td><form name="formSecurity"><p class="clasificacion"><input id="radio6" type="radio" name="security_star" value="5"><!--' +
    '--><label for="radio6">★</label><!--' +
    '--><input id="radio7" type="radio" name="security_star" value="4"><!--' +
    '--><label for="radio7">★</label><!--' +
    '--><input id="radio8" type="radio" name="security_star" value="3"><!--' +
    '--><label for="radio8">★</label><!--' +
    '--><input id="radio9" type="radio" name="security_star" value="2"><!--' +
    '--><label for="radio9">★</label><!--' +
    '--><input id="radio10" type="radio" name="security_star" value="1"><!--'+
'--><label for="radio10">★</label></p></form></td></tr><tr><td>Ambient:</td><td><form name="formAmbient"><p class="clasificacion"><input id="radio11" type="radio" name="ambient_star" value="5"><!--' +
'--><label for="radio11">★</label><!--' +
'--><input id="radio12" type="radio" name="ambient_star" value="4"><!--' +
'--><label for="radio12">★</label><!--' +
'--><input id="radio13" type="radio" name="ambient_star" value="3"><!--' +
'--><label for="radio13">★</label><!--' +
'--><input id="radio14" type="radio" name="ambient_star" value="2"><!--' +
'--><label for="radio14">★</label><!--' +
'--><input id="radio15" type="radio" name="ambient_star" value="1"><!--' +
'--><label for="radio15">★</label></p></form></td></tr><tr><td></td><td><input type="button" value="Save" onclick="saveData()"></td></tr></table>';
var map;
var heatmap;
var marker;
var locationMarker;
var server = 'localhost';
var coordinate;
