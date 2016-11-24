import React from "react";
import { Polygon, InfoWindow } from "react-google-maps";

var OUPolygons = React.createClass({

  //Find the approximate center of polygon
  findCenter: function(points) {
    var bounds = new google.maps.LatLngBounds();

    var len = points.length;
    while (len--) {
      bounds.extend(points[len]);
    }

    return bounds.getCenter();
  },

  //Gets units with coordinates from the OUStore and sets up data for markers/polygons
  render: function() {
    if (this.props.disable || !this.props.orgUnit) { return null; }

    //Only facilities that have coordinates are taken into account
    if (!(this.props.orgUnit.hasOwnProperty("coordinates") && this.props.orgUnit.featureType == "POLYGON"))  { return null; }

    var points = []
    try {
      //Polygons are formated as multipolygons (4 outer brackets)
      points = JSON.parse(this.props.orgUnit.coordinates)[0][0].map(coord => (
        {lat: coord[1], lng: coord[0]}
      ))
    } catch (e) {
      return false;
    }

    return (
      <div>
      <Polygon
        {...this.props}
        key={this.props.orgUnit.id}
        options={this.props.options}
        onClick={this.props.onClick}
        path={points}
      >

      </Polygon>
      {this.props.showInfo && (
        <InfoWindow {...this.props}
          onCloseclick={this.props.onClick}
          defaultPosition={this.findCenter(points)}>

          <div className="infoWindow">
            <ul>
              <li><b>{this.props.orgUnit.displayName}</b></li>
              <li>code: {this.props.orgUnit.code}</li>
              <li>opened: {this.props.orgUnit.openingDate.substring(0, this.props.orgUnit.openingDate.indexOf('T'))}</li>
            </ul>
          </div>
        </InfoWindow>
      )}
      </div>
    )
  }
})

//Defaults
OUPolygons.defaultProps = {
  orgUnit: {},
  disabled: false,
  options: {
    strokeColor: "#00A",
    fillColor: "#00A",
    fillOpacity: 0.4,
    strokeWeight: 1
  }
};

module.exports = OUPolygons;
