import React from "react";
import OUStore from "../stores/OUStore"

var SearchList = React.createClass({

  getInitialState: function () {
    return {
      items: OUStore.getAll()
    };
  },

  //Gets organization units from the OU store.
  getOrgUnits: function() {
    this.setState({
      items: OUStore.getAll()
    })
  },

  //Eventhandler to update this objetc's items
  componentWillMount: function() {
    OUStore.on("change", this.getOrgUnits);
  },

  render: function() {
    console.log("Render called!");
    return (
      <div>
      <h1>Search test results:</h1>
      <ul>
        {this.state.items.map(function(item, i) {
          console.log(i, item.displayName); //For testing purposes
          return <li key={item.id}>{item.displayName}</li>;
        })}
      </ul>
      </div>
    )
  }
});

module.exports = SearchList;
