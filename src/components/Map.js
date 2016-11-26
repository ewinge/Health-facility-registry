import React from "react";
import { GoogleMapLoader, GoogleMap } from "react-google-maps";

var Map = React.createClass({

  getInitialState: function() {
    return ({
      center: this.props.defaultCenter,
      panning: true
    });
  },

  //Called when an actiive locate button is pressed
  pan: function(coords) {
    this.setState({
      center: coords,
      panning: true
    });
  },

  render: function() {
    return (
        <GoogleMapLoader
          containerElement = { this.props.container }
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
  container: <div className="map"></div>,
  defaultCenter: {
    lat: 8.7208,
    lng: -11.9388
  },
  defaultZoom: 8
};

module.exports = Map;
