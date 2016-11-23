import React from "react";
import { Polygon } from "react-google-maps";

var OUPolygons = React.createClass({

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
      <Polygon
        {...this.props}
        key={this.props.orgUnit.id}
        options={this.props.options}
        path={points}
      />
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
