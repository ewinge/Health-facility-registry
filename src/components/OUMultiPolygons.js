import React from "react";
import { Polygon, InfoWindow } from "react-google-maps";
import { parseMultiPolygon, findUnitCenter } from "../utils/CoordinateUtils";

var OUMultiPolygons = React.createClass({

  //Gets units with coordinates from the OUStore and sets up data for markers/polygons
  render: function() {
    if (this.props.disable || !this.props.orgUnit) { return null; }

    //Only facilities that have coordinates are taken into account
    if (!(this.props.orgUnit.hasOwnProperty("coordinates") && this.props.orgUnit.featureType == "MULTI_POLYGON"))  { return null; }

    var polygonList = parseMultiPolygon(this.props.orgUnit.coordinates);

    return (
      <div>

      {polygonList.map((points, i) => {
        return (
          <Polygon
            {...this.props}
            key={i}
            options={this.props.options}
            onClick={this.props.onClick}
            path={points}
          />
        )
      })}

      {this.props.showInfo && (
        <InfoWindow {...this.props}
          onCloseclick={this.props.onClick}
          defaultPosition={findUnitCenter(this.props.orgUnit)}>

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
OUMultiPolygons.defaultProps = {
  orgUnit: {},
  disabled: false,
  options: {
    strokeColor: "#00A",
    fillColor: "#00A",
    fillOpacity: 0.4,
    strokeWeight: 1
  }
};

module.exports = OUMultiPolygons;
