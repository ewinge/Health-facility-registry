import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import { parsePoint } from "../utils/CoordinateUtils";

var OUMarkers = React.createClass({

  render: function() {
    if (this.props.disable || !this.props.orgUnit) { return null; }

    //Only facilities that have coordinates are taken into account
    if (!(this.props.orgUnit.hasOwnProperty("coordinates") && this.props.orgUnit.featureType == "POINT"))  { return null; }

    return (
    <Marker
      {...this.props}
      key={this.props.orgUnit.id}
      onClick={this.props.onClick}
      position={parsePoint(this.props.orgUnit.coordinates)}
    >

      {this.props.showInfo && (
        <InfoWindow onCloseclick={this.props.onClick}>
          <div className="infoWindow">
            <ul>
              <li><b>{this.props.orgUnit.displayName}</b></li>
              <li>ID: {this.props.orgUnit.id}</li>
              <li>code: {this.props.orgUnit.code}</li>
              <li>opened: {this.props.orgUnit.openingDate.substring(0, this.props.orgUnit.openingDate.indexOf('T'))}</li>
            </ul>
          </div>
        </InfoWindow>
      )}
     </Marker> )
   }
})

//Defaults
OUMarkers.defaultProps = {
  orgUnit: {},
  disabled: false
};

module.exports = OUMarkers;
