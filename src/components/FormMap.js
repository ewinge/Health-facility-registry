import React, { Component, PropTypes } from 'react';
import OUMultiPolygons from "./OUMultiPolygons";
import OUPolygons from "./OUPolygons";
import OUMarkers from "./OUMarkers";
import OUStore from "../stores/OUStore";
import Map from "./Map";

const FormMap = React.createClass({
  getInitialState: function() {
    return ({
      orgUnits: [],
      itemClicked: []
    });
  },

  //Gets units from the OUStore and creates boolean array that determines
  //if a marker infoWindow will be rendered or not
  getUnits: function() {
    const units = OUStore.getFilteredResult();

    //Create boolean list to determine which InfoWindows will be shown
    var bool = new Array(units.length);

    var len = units.length;
    while (len--) {
      bool[len] = false;
    }

    this.setState({
      orgUnits: units,
      markerClicked: bool,
    });
  },

  //Handles marker and polygon clicks
  onItemClick: function(index) {
    var arr = this.state.itemClicked;
    arr[index] = !arr[index];
    this.setState({
      itemClicked: arr
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
    this.props.onClick(e);
  },

  render: function() {
    const mapContainer = <div className="formMap"></div>
    return (
      <Map ref={(map) => { this._child = map }} onClick={this.onClick} container={mapContainer}>

        {this.state.orgUnits.map((unit, i) => (
          <OUMarkers key={i}
            orgUnit={unit}
            showInfo={this.state.itemClicked[i]}
            onClick={() => this.onItemClick(i)}/>))}

        {this.state.orgUnits.map((unit, i) =>
          (<OUPolygons key={i}
            orgUnit={unit}
            showInfo={this.state.itemClicked[i]}
            onClick={() => this.onItemClick(i)}/>))}

        {this.state.orgUnits.map((unit, i) =>
          (<OUMultiPolygons key={i}
            orgUnit={unit}
            showInfo={this.state.itemClicked[i]}
            onClick={() => this.onItemClick(i)}/>))}


      </Map>
    )
  }
})

module.exports = FormMap;

/*
FormMap.propTypes = {
    onClick: PropTypes.func.required,
};
*/
