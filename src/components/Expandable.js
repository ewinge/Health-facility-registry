import React from "react";
import OUStore from "../stores/OUStore";
import DeleteButton from "./buttons/DeleteButton";
import LocateButton from "./buttons/LocateButton";
import EditButton from "./buttons/EditButton";
import NewChildButton from "./buttons/NewChildButton";
import ViewFacilityButton from "./buttons/ViewFacilityButton";
import { findUnitCenter } from "../utils/CoordinateUtils";

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
														 !unit.hasOwnProperty('featureType');

			var coords = [];
			if (!locateDisabled) {
				coords = findUnitCenter(unit);
			};

			return (
				<li key={this.props.id} onClick={this.handleClick}>
					<ol>
						<li><b>{unit.displayName}</b></li>
						<li><b>ID</b>:     {unit.id}</li>
						<li><b>Code</b>:   {unit.code}</li>
						<li><b>Level</b>:  {OUStore.getLevelString(unit.level)}</li>
						{unit.level == 4 && <li><b>Opened:</b> {unit.openingDate.substring(0, unit.openingDate.indexOf('T'))}</li>}
						{(unit.level == 4 && !locateDisabled) && <li><b>Coordinates</b>: {unit.coordinates}</li>}
						{(unit.level == 4 && locateDisabled) && <li><b>Coordinates</b>: unavailable</li>}
						<li><LocateButton disabled={locateDisabled} coords={coords}/></li>
						{(unit.level < 4 && unit.level > 0 && !locateDisabled) && <ViewFacilityButton orgUnit={this.props.orgUnit}/>}
					</ol>
					<div style={{align: "right"}}>
						<EditButton orgUnit={this.props.orgUnit} style={{width: "30%"}} />
						<NewChildButton orgUnit={this.props.orgUnit} style={{width: "30%"}} />
						<DeleteButton orgUnit={this.props.orgUnit} style={{width: "30%", background: "#BA3434", color: "white"}}/>
					</div>
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
