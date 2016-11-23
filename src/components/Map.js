import React from "react";
import { GoogleMapLoader, GoogleMap } from "react-google-maps";

var Map = React.createClass({
  getInitialState: function() {

    return ({
      center: this.props.defaultCenter,
      zoom: this.props.defaultZoom,
      panning: true
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

              onClick={this.props.onClick}
              defaultCenter={this.props.defaultCenter}
              defaultZoom={this.props.defaultZoom}
              options={this.props.options}
            >

            {this.props.children}

            </GoogleMap>
          }
        />
    )
  }
})

//Defaults
Map.defaultProps = {
  defaultCenter: {
    lat: 8.7208,
    lng: -11.9388
  },
  defaultZoom: 8
};

module.exports = Map;
