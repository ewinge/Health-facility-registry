import React from "react";
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import OUStore from "../stores/OUStore";

var Map = React.createClass({
  getInitialState: function() {

    return ({
      defaultCenter: this.props.center,
      center: this.props.center,
      zoom: this.props.zoom,
      markers: [],
      panning: true
    });
  },

  //Gets units with coordinates from the OUStore
  getMarkers: function() {
    this.setState({
      markers: OUStore.getCoordinates()
    });
  },

  //Handles marker clicks
  onMarkerClick: function(unit) {
    console.log("Opened info window:", unit.orgUnit.displayName);
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === unit) {
          marker.showInfo = true;
          return marker;
        }
        return marker;
      })
    });
  },

  //Handles close info window closes
  onWindowClose: function(unit) {
    console.log("Closed info window:", unit.orgUnit.displayName);
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === unit) {
          marker.showInfo = false;
          return marker;
        }
        return marker;
      })
    });
  },

  //Called when an actiive locate button is pressed
  pan: function(coords) {
    this.setState({
      center: coords,
      zoom: 12,
      panning: true
    });
  },

  //Listen to list changes in OUStore
  componentWillMount: function() {
    OUStore.on("listChange", this.getMarkers);
    OUStore.on("locate", this.pan)
  },

  onClick: function(e) {
    console.log("Clicked location:", e.latLng.lat(), e.latLng.lng());
  },

  render: function() {
    const mapContainer = <div className="map"></div>

    return (
        <GoogleMapLoader
          containerElement = { mapContainer }
          googleMapElement = {
            <GoogleMap
              ref={(map) => {
                if (map && this.state.panning) {
                  map.panTo(this.state.center)
                  this.state.panning = false;
                }
              }}
              onClick={this.onClick}
              defaultCenter={this.state.defaultCenter}
              defaultZoom={this.state.zoom}
              options={{mapTypeControl: false}}>
              {this.state.markers.map((marker, i) => (
                <Marker
                  key={i}
                  position={marker.coordinates}
                  onClick={() => this.onMarkerClick(marker)}
                >

                {marker.showInfo && (
                  <InfoWindow onCloseclick={() => this.onWindowClose(marker)}>
                  <div className="infoWindow">
                    <ul>
                      <li><b>{marker.orgUnit.displayName}</b></li>
                      <li>code: {marker.orgUnit.code}</li>
                      <li>opened: {marker.orgUnit.openingDate.substring(0, marker.orgUnit.openingDate.indexOf('T'))}</li>
                    </ul>
                  </div>
                  </InfoWindow>
                )}
                </Marker>
              ))}
            </GoogleMap>
          }
        />
    )
  }
})

module.exports = Map;
