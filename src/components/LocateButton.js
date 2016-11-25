import React from "react";
import { handleLocate } from "../actions/Actions";

var LocateButton = React.createClass({

  onClick: function(e) {

    //Makes sure that parent of button's click event isn't triggered as well.
    e.stopPropagation();

    handleLocate(this.props.coords);
  },

  render: function() {
    return (
      <button className="locateButton" type="button" disabled={this.props.disabled} onClick={this.onClick}>Locate</button>
    );
  }
})

module.exports = LocateButton;
