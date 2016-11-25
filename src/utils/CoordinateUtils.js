/**
* Parse string coordinates of feature type POINT
* @param {String} point - string value of coordinates
* @return {Object} - contains an object with lat and lng values
*/
export function parsePoint(point) {
  const coords = JSON.parse(point);
  return {lat: coords[1], lng: coords[0]};
}

/**
* Parse string coordinates of feature type POLYGON
* @param {String} poly - string value of polygon coordinates
* @return {Array} - contains all points in the polygon
*/
export function parsePolygon(poly) {
  var points = [];
  try {
    //Polygons are formated as multipolygons (4 outer brackets)
    points = JSON.parse(poly)[0][0].map(coord => (
      {lat: coord[1], lng: coord[0]}
    ))
  } catch (e) {
    console.log("WARNING: Error while parsing polygon");
    return [];
  }

  return points;
}

/**
* Parse string coordinates of feature type MULTI_POLYGON
* @param {String} mulpoly - string value of multipolygon coordinates
* @return {Array} - contains all polygons
*/
export function parseMultiPolygon(mulpoly) {
  const coords = JSON.parse(mulpoly);
  var polys = []

  //There's probably a better way of doing this
  for (var i = 0; i < coords.length; i++) {
    for (var j = 0; j < coords[i].length; j++) {

      var poly = []
      for (var k = 0; k < coords[i][j].length; k++) {
        poly.push({lat: coords[i][j][k][1], lng: coords[i][j][k][0]})
      }
    }
    polys.push(poly);
  }

  return polys;
}

/**
* Find the approximate center of polygon
* @param {Array} poly - an array of objects containing lat and lng values
* @return {Object} - contains lat and lng values
*/
export function findPolygonCenter(poly) {
  var bounds = new google.maps.LatLngBounds();

  var len = poly.length;
  while (len--) {
    bounds.extend(poly[len]);
  }

  const center = bounds.getCenter();
  return {lat: center.lat(), lng: center.lng()};
}

/**
* Finds an organization unit's center coordinates
* @param {Object} orgUnit - organization unit
* @return {Object} - contains center lat and lng
*/
export function findUnitCenter(orgUnit) {
  var coords = [];
  switch (orgUnit.featureType) {
    case "POINT": { coords = parsePoint(orgUnit.coordinates); break; }
    case "POLYGON": { coords = findPolygonCenter(parsePolygon(orgUnit.coordinates)); break;}
    case "MULTI_POLYGON": { coords = findPolygonCenter(parseMultiPolygon(orgUnit.coordinates)[0]); break;}
  }

  return coords;
}
