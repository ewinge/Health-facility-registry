import React from "react";
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

import OUStore from "../stores/OUStore";

var Map = React.createClass({
  getInitialState: function() {
    return ({ markers: [] });
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

  //Listen to list changes in OUStore
  componentWillMount: function() {
    OUStore.on("listChange", this.getMarkers);
  },

  render: function() {
    const mapContainer = <div className="map"></div>

    return (
        <GoogleMapLoader
          containerElement = { mapContainer }
          googleMapElement = {
            <GoogleMap
              defaultZoom={5}
              defaultCenter={this.props.center}
              options={{streetcamViewCOntroll: false, mapTypeControl: false}}>
              {this.state.markers}
            </GoogleMap>
          }
        />
    )
  }
})

module.exports = Map;
