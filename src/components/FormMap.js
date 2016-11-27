import React, { Component, PropTypes } from 'react';
import OUMultiPolygons from "./OUMultiPolygons";
import OUPolygons from "./OUPolygons";
import OUMarkers from "./OUMarkers";
import OUStore from "../stores/OUStore";
import Map from "./Map";

const FormMap = React.createClass({
  getInitialState: function() {
    return ({
      itemClicked: []
    });
  },

  //Pan to coords
  pan: function(coords) {
    this._child.pan(coords);
  },

  //Listen to list changes in OUStore
  componentWillMount: function() {
    OUStore.on("locate", this.pan);
  },

  //Unlisten upon dismounting
  componentWillUnmount: function() {
    OUStore.removeListener("locate", this.pan);
  },

  onClick: function(e) {
    this.props.onClick(e);
  },

  render: function() {
    console.log("FormMap units:", this.props.orgUnits);
    const mapContainer = <div className="formMap"></div>
    return (
      <Map ref={(map) => { this._child = map }} onClick={this.onClick} container={mapContainer}>

        {this.props.orgUnits.map((unit, i) => (
          <OUMarkers key={i}
            orgUnit={unit}
            showInfo={this.state.itemClicked[i]}
            onClick={() => this.onItemClick(i)}/>))}

        {this.props.orgUnits.map((unit, i) =>
          (<OUPolygons key={i}
            orgUnit={unit}
            showInfo={this.state.itemClicked[i]}
            onClick={() => this.onItemClick(i)}/>))}

        {this.props.orgUnits.map((unit, i) =>
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
