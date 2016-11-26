import React from "react";
import OUStore from "../../stores/OUStore"
import { handleDelete } from "../../actions/Actions";

var DeleteButton = React.createClass({
  onClick: function(e) {

    //Makes sure that parent of button's click event isn't triggered as well.
    e.stopPropagation();

    handleDelete(this.props.orgUnit);
  },

  render: function() {
    if (!OUStore.hasChildren(this.props.orgUnit.id)) {
      return (
        <button className="button"
                width="10px"
                type="button"
                disabled={this.props.disabled}
                onClick={this.onClick}
                style={this.props.style}>
                Delete
        </button>
      );
    }

    return null;
  }
})

DeleteButton.defaultProps = {
  style: {
    background: "red"
  }
}

module.exports = DeleteButton;
