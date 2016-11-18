import React from "react";
import OUStore from "../stores/OUStore";
import { handleLocate} from "../actions/SearchActions";

var LocateButton = React.createClass({

  onClick: function() {
    handleLocate(this.props.coords);
  },

  render: function() {
    return (
      <button type="button" disabled={this.props.disabled} onClick={this.onClick}>Locate</button>
    );
  }
})

module.exports = LocateButton;
