import React from "react";
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, Polygon } from "react-google-maps";
import GeoJSON from "geojson"

import OUStore from "../stores/OUStore";

var Map = React.createClass({
  getInitialState: function() {

    return ({
      defaultCenter: this.props.center,
      center: this.props.center,
      zoom: this.props.zoom,
      markers: [],
      polygons: [],
      panning: true,
      showPolygons: false
    });
  },

  //Gets units with coordinates from the OUStore and sets up data for markers/polygons
  getMarkers: function() {
    var orgUnits = OUStore.getFilteredResult();

    var newMarkers = [];
    var newPolygons = [];

    var i = orgUnits.length;
    while (i--) {

      //Only facilities that have coordinates are taken into account
      if (orgUnits[i].hasOwnProperty("coordinates")) {

        if (orgUnits[i].featureType == "POINT") {
          const coords = JSON.parse(orgUnits[i].coordinates);
          newMarkers.push({
            coordinates: {
              lat: coords[1],
              lng: coords[0]
            },
            orgUnit: orgUnits[i],
            showInfo: false
          })

          //Polygons are formated as multipolygons (4 outer brackets)
        } else if (orgUnits[i].featureType == "POLYGON") {
          const coords = JSON.parse(orgUnits[i].coordinates)[0][0].map(coord => (
            {lat: coord[1], lng: coord[0]}
          ))

          const poly = {
            level: orgUnits[i].level,
            points: coords
          }

          newPolygons.push(poly);

        } else if (orgUnits[i].featureType == "MULTI_POLYGON") {

          //TODO

        }
      }
    }

    //Polygons will only be showed if no markers are present
    newMarkers.length > 0 ? this.state.showPolygons = false : this.state.showPolygons = true;

    this.setState({
      markers: newMarkers,
      polygons: newPolygons
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

  //Unlisten upon dismounting
  componentWillUnmount: function() {
    OUStore.removeListener("listChange", this.getMarkers);
    OUStore.removeListener("locate", this.pan)
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

               {this.state.showPolygons && this.state.polygons.map((polygon, j) => {

                var options = {
                  strokeColor: "#000",
                  fillColor: "#000",
                  fillOpacity: 0.4,
                  strokeWeight: 1
                }

                if (polygon.level == 3) {
                    options.strokeColor = "#088"
                    options.fillColor = "#088"
                } else if (polygon.level == 2) {
                    options.strokeColor = "#808"
                    options.fillColor = "#808"
                }

                 return <Polygon
                          key={j}
                          options={options}
                          path={polygon.points}

                           />;
               })}
            </GoogleMap>
          }
        />
    )
  }
})

module.exports = Map;
