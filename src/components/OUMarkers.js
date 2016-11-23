import React from "react";
import { Marker, InfoWindow } from "react-google-maps";

var OUMarkers = React.createClass({

  render: function() {
    if (this.props.disable || !this.props.orgUnit) { return null; }

    //Only facilities that have coordinates are taken into account
    if (!(this.props.orgUnit.hasOwnProperty("coordinates") && this.props.orgUnit.featureType == "POINT"))  { return null; }

    const coords = JSON.parse(this.props.orgUnit.coordinates);
    const marker = {
      coordinates: {
        lat: coords[1],
        lng: coords[0]
      },

      orgUnit: this.props.orgUnit,
      showInfo: false
    }

    return (
    <Marker
      {...this.props}
      key={this.props.orgUnit.id}
      position={marker.coordinates}
      onClick={this.props.onClick}
    >

      {this.props.showInfo && (
        <InfoWindow onCloseclick={this.props.onClick}>
          <div className="infoWindow">
            <ul>
              <li><b>{marker.orgUnit.displayName}</b></li>
              <li>code: {marker.orgUnit.code}</li>
              <li>opened: {marker.orgUnit.openingDate.substring(0, marker.orgUnit.openingDate.indexOf('T'))}</li>
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
