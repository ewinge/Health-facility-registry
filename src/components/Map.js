import React from "react";
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

import OUStore from "../stores/OUStore";

var Map = React.createClass({
  getInitialState: function() {
    return ({
      center: this.props.center,
      zoom: this.props.zoom,
      markers: [],
    });
  },

  getMarkers: function() {
    const newMarkers = OUStore.getCoordinates().map((coords, i) => {
      //console.log(coords);
      const marker = {
        position: {
          lat: coords.lat,
          lng: coords.lng
        }
      }

      return <Marker key={i} {...marker} />
    })

    this.setState({
      markers: newMarkers
    });
  },

  //Called when an actiive locate button is pressed
  pan: function(coords) {
    this.setState({
      center: coords,
      zoom: 12
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
              ref={(map) => map && map.panTo(this.state.center)}
              onClick={this.onClick}
              zoom={this.state.zoom}
              center={this.state.center}
              options={{mapTypeControl: false}}>
              {this.state.markers}
            </GoogleMap>
          }
        />
    )
  }
})

module.exports = Map;
