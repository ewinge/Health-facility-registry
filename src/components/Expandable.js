import React from "react";
import { loadUnit } from '../api';
import OUStore from "../stores/OUStore"

//Expands list item to show more detail
var Expandable = React.createClass({
	getInitialState: function() {
    return ({
        expanded: false,
        code: "unknown",
        level: "unknown"
    })
  },

  handleClick: function(e) {
		var orgUnit = OUStore.getUnit(this.props.id)

		this.setState(prevState => ({
			expanded: !prevState.expanded,
			code: orgUnit.code,
			level: OUStore.getLevelString(orgUnit.level)
		}));
  },

  render: function() {
    if (this.state.expanded) {
      return (
        <li key={this.props.id} onClick={this.handleClick}>
            <ol>
              <li><b>{this.props.displayName}</b></li>
              <li><b>Code</b>: {this.state.code}</li>
              <li><b>Level</b>: {this.state.level}</li>
            </ol>
        </li>
      );

    } else {
      return (
        <li key={this.props.id} onClick={this.handleClick}>
          {this.props.displayName}
        </li>
      );
    }
  }
});

module.exports = Expandable;
