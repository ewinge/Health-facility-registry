import React from "react";
import { handleViewFacilities } from "../actions/Actions";

var ViewFacilityButton = React.createClass({
  onClick: function(e) {

    //Makes sure that parent of button's click event isn't triggered as well.
    e.stopPropagation();

    handleViewFacilities(this.props.orgUnit.children);
  },

  render: function() {
    return (
      <button onClick={this.onClick} className="button">Show facilities</button>
    )
  }
})


module.exports = ViewFacilityButton;
