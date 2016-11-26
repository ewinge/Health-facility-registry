import React from "react";
import { handleLocate } from "../../actions/Actions";

var LocateButton = React.createClass({
  onClick: function(e) {

    //Makes sure that parent of button's click event isn't triggered as well.
    e.stopPropagation();

    handleLocate(this.props.coords);
  },

  render: function() {
    return (
      <button className="button"
              type="button"
              disabled={this.props.disabled}
              onClick={this.onClick}
              style={this.props.style}>
              Locate
      </button>
    );
  }
})

module.exports = LocateButton;
