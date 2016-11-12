import React from "react";
import { loadUnit } from '../api';

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
    loadUnit(this.props.id).then((orgUnit) => {

      var levelName = "unknown"
      switch (orgUnit.level) {
        case 1: levelName =  "Country"; break;
        case 2: levelName =  "Province"; break;
        case 3: levelName =  "District"; break;
        case 4: levelName =  "Health facility"; break;
      }

      this.setState(prevState => ({
        expanded: !prevState.expanded,
        code: orgUnit.code,
        level: levelName
      }));
    });
  },

  render: function() {
    if (this.state.expanded) {
      return (
        <li key={this.props.id} onClick={this.handleClick}>
          <div>
            <ol>
              <li><b>{this.props.displayName}</b></li>
              <li><b>Code</b>: {this.state.code}</li>
              <li><b>Level</b>: {this.state.level}</li>
            </ol>
          </div>
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
