import React from "react";
import { handleViewFacilities } from "../../actions/Actions";

var ViewFacilityButton = React.createClass({
  onClick: function(e) {

    //Makes sure that parent of button's click event isn't triggered as well.
    e.stopPropagation();

    handleViewFacilities(this.props.orgUnit.children);
  },

  render: function() {
    return (
      <button className="button"
              type="button"
              disabled={this.props.disabled}
              onClick={this.onClick}
              style={this.props.style}>
              show facilities
      </button>
    );
  }
})


module.exports = ViewFacilityButton;
