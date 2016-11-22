import React from "react";
import { loadUnit } from '../api';
import OUStore from "../stores/OUStore"
import LocateButton from "./LocateButton"

//Expands list item to show more detail
var Expandable = React.createClass({
	getInitialState: function() {
    return ({
        expanded: false,
        orgUnit: this.props.orgUnit
    })
  },

  handleClick: function(e) {
		this.setState(prevState => ({
			expanded: !prevState.expanded,
		}));
  },

  render: function() {
    if (this.state.expanded) {

			//Only facilities (level 4) will have locate buttons
			if (this.state.orgUnit.level == 4) {

				//Not all facilities have coordinates
				const locateDisabled = !this.props.orgUnit.hasOwnProperty('coordinates');
				var coords = locateDisabled ? coords = "unavailable" : coords = this.props.orgUnit.coordinates.replace(/[\[\]']+/g, '');

				return (
					<li key={this.props.id} onClick={this.handleClick}>
							<ol>
								<li><b>{this.props.orgUnit.displayName}</b></li>
								<li><b>Code</b>: {this.props.orgUnit.code}</li>
								<li><b>Opened:</b> {this.props.orgUnit.openingDate.substring(0, this.props.orgUnit.openingDate.indexOf('T'))}</li>
								<li><b>Level</b>: {OUStore.getLevelString(this.props.orgUnit.level)}</li>
								<li><b>Coordinates</b>: {coords}</li>
								<li><LocateButton disabled={locateDisabled} coords={coords}/></li>
							</ol>
					</li>
				);

			} else {
				return (
					<li key={this.props.id} onClick={this.handleClick}>
							<ol>
								<li><b>{this.props.orgUnit.displayName}</b></li>
								<li><b>Code</b>: {this.props.orgUnit.code}</li>
								<li><b>Level</b>: {OUStore.getLevelString(this.props.orgUnit.level)}</li>
							</ol>
					</li>
				);
			}

    } else {
      return (
        <li key={this.props.id} onClick={this.handleClick}>
          {this.props.orgUnit.displayName}
        </li>
      );
    }
  }
});

module.exports = Expandable;
