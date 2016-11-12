import React from "react";
import OUStore from "../stores/OUStore"
import Expandable from "./Expandable"

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

  createList: function() {
    var listItems = this.state.items.map(function(item, i) {
      console.log(i, item.displayName); //For testing purposes
      return <Expandable id={item.id} displayName={item.displayName} />
    });

    if (listItems.length == 0) {
      return <p>No such facility found.</p>;

    } else {
      return (<ul>{listItems}</ul>);
    }
  },

  render: function() {
    return (
      <div className="searchList">
        <h1>Search results:</h1>
        {this.createList()}
      </div>
    )
  }
});

module.exports = SearchList;
