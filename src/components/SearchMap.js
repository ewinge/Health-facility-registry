import React from "react";
import { GoogleMapLoader, GoogleMap } from "react-google-maps";
import OUPolygons from "./OUPolygons";
import OUMarkers from "./OUMarkers";
import OUStore from "../stores/OUStore";
import Map from "./Map";

var SearchMap = React.createClass({
  getInitialState: function() {
    return ({
      markers: [],
      polygons: [],
      markerClicked: [],
      showPolygons: false
    });
  },

  //Gets units from the OUStore and creates boolean array that determines
  //if a marker infoWindow will be rendered or not
  getUnits: function() {
    const units = OUStore.getFilteredResult();

    var newMarkers = [];
    var newPolygons = [];

    units.map((unit) => {
      if (unit.hasOwnProperty("featureType")) {
        switch(unit.featureType) {
          case "POINT": { newMarkers.push(unit); break; }
          case "POLYGON": { newPolygons.push(unit); break; }
          case "MULTI_POLYGON": {  /*TODO; */ break; }
        }
      }
    });

    var bool = new Array(newMarkers.length);
    var i = units.length;

    while (i--) {
      bool[i] = false;
    }

    this.setState({
      markers: newMarkers,
      polygons: newPolygons,
      markerClicked: bool,
      showPolygons: !(newMarkers.length > 0)
    });
  },

  //Handles marker clicks
  onMarkerClick: function(index) {
    var arr = this.state.markerClicked;
    arr[index] = !arr[index];
    this.setState({
      markerClicked: arr
    });
  },

  //Pan to coords
  pan: function(coords) {
    this._child.pan(coords);
  },

  //Listen to list changes in OUStore
  componentWillMount: function() {
    OUStore.on("listChange", this.getUnits);
    OUStore.on("locate", this.pan);
  },

  componentDidMount: function() {
    this.getUnits();
  },

  //Unlisten upon dismounting
  componentWillUnmount: function() {
    OUStore.removeListener("listChange", this.getUnits);
    OUStore.removeListener("locate", this.pan);
  },

  onClick: function(e) {
    console.log("Clicked location:", e.latLng.lat(), e.latLng.lng());
  },

  render: function() {
    return (
      <Map ref={(map) => { this._child = map }} onClick={this.onClick}>

        {this.state.markers.map((unit, i) => (
          <OUMarkers key={i}
                     orgUnit={unit}
                     showInfo={this.state.markerClicked[i]}
                     onClick={() => this.onMarkerClick(i)}/>))}

        {this.state.showPolygons && this.state.polygons.map((unit, i) => (<OUPolygons key={i} orgUnit={unit} />))}

      </Map>
    )
  }
})

module.exports = SearchMap;
