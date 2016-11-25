import React from "react";
import OUStore from "../stores/OUStore"
import LocateButton from "./LocateButton"

//Expands list item to show more detail
var Expandable = React.createClass({
	getInitialState: function() {
    return ({
        expanded: false,
    })
  },

  handleClick: function(e) {
		this.setState(prevState => ({
			expanded: !prevState.expanded,
		}));
  },

  render: function() {
		const unit = this.props.orgUnit;

    if (this.state.expanded) {
			//Not all facilities have coordinates
			const locateDisabled = !unit.hasOwnProperty('coordinates') ||
														 !unit.hasOwnProperty('featureType') ||
														 unit.featureType == "MULTI_POLYGON"; //MULTI_POLYGON not implemented yet

			var coords = [];
			if (!locateDisabled) {
				coords = OUStore.findUnitCenter(unit);
			};

			return (
				<li key={this.props.id} onClick={this.handleClick}>
					<ol>
						<li><b>{unit.displayName}</b></li>
						<li><b>Code</b>:   {unit.code}</li>
						<li><b>Level</b>:  {OUStore.getLevelString(unit.level)}</li>
						{unit.level == 4 && <li><b>Opened:</b> {unit.openingDate.substring(0, unit.openingDate.indexOf('T'))}</li>}
						{(unit.level == 4 && !locateDisabled) && <li><b>Coordinates</b>: {unit.coordinates}</li>}
						{(unit.level == 4 && locateDisabled) && <li><b>Coordinates</b>: unavailable</li>}
						<li><LocateButton disabled={locateDisabled} coords={coords}/></li>
					</ol>
				</li>
			);

    } else {
      return (
        <li key={this.props.id} onClick={this.handleClick}>
          {unit.displayName}
        </li>
      );
    }
  }
});

module.exports = Expandable;
