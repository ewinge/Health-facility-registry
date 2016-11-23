import React from "react";
import { GoogleMapLoader, GoogleMap } from "react-google-maps";
import OUPolygons from "./OUPolygons";
import OUMarkers from "./OUMarkers";
import OUStore from "../stores/OUStore";
import Map from "./Map";

var SearchMap = React.createClass({
  getInitialState: function() {

    return ({
      defaultCenter: this.props.center,
      center: this.props.center,
      zoom: this.props.zoom,
      orgUnits: [],
      markerClicked: [],
      showPolygons: false,
      showMarkers: false
    });
  },

  //Gets units from the OUStore and creates boolean array that determines
  //if a marker infoWindow will be rendered or not
  getUnits: function() {
    const units = OUStore.getFilteredResult();
    var bool = new Array(units.length);
    var i = units.length;

    while (i--) {
      bool[i] = false;
    }

    this.setState({
      orgUnits: units,
      markerClicked: bool
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
    OUStore.on("locate", this.pan)
  },

  //Unlisten upon dismounting
  componentWillUnmount: function() {
    OUStore.removeListener("listChange", this.getUnits);
    OUStore.removeListener("locate", this.pan)
  },

  onClick: function(e) {
    console.log("Clicked location:", e.latLng.lat(), e.latLng.lng());
  },

  render: function() {
    return (
      <Map ref={(map) => { this._child = map; }} onClick={this.onClick}>

        {this.state.orgUnits.map((unit, i) => (
          <OUMarkers key={i}
                     orgUnit={unit}
                     showInfo={this.state.markerClicked[i]}
                     onClick={() => this.onMarkerClick(i)}/>))}


        {this.state.orgUnits.map((unit, i) => (<OUPolygons key={i} orgUnit={unit} />))}

      </Map>
    )
  }
})

module.exports = SearchMap;
