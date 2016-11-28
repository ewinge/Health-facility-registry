import React from "react";
import { startEdit } from "../../actions/Actions";

const NewChildButton = React.createClass({

  onClick: function(e) {

    //Makes sure that parent of button's click event isn't triggered as well.
    e.stopPropagation();

    startEdit("", this.props.orgUnit.id);
  },

  render: function() {
    return (
      <button className="button"
              type="button"
              disabled={this.props.disabled}
              onClick={this.onClick}
              style={this.props.style}>
              New child
      </button>
    );
  }
})

module.exports = NewChildButton;
