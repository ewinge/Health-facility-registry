import React from "react";
import OUStore from "../stores/OUStore"
import Expandable from "./Expandable"

var SearchList = React.createClass({

  getInitialState: function () {
    return {
      items: OUStore.getQueryResult()
    };
  },

  //Gets search query results from the OU store.
  getQueryResult: function() {
    this.setState({
      items: OUStore.getQueryResult()
    });
  },

  //Gets filtered search query results from the OU store.
  getFilteredResult: function() {
    this.setState({
      items: OUStore.getFilteredResult()
    });
  },

  //Eventhandler to update this objetc's items
  componentWillMount: function() {
    OUStore.on("searchChange", this.getQueryResult);
    OUStore.on("filterChange", this.getFilteredResult);
  },

  createList: function() {
    var listItems = this.state.items.map(function(item, i) {

      //console.log(i, item.displayName); //For testing purposes
      return <Expandable key={item.id} id={item.id} displayName={item.displayName} />
    });

    if (listItems.length == 0) {
      return <p>No such unit found.</p>;

    } else {
      return (<ul>{listItems}</ul>);
    }
  },

  render: function() {
    return (
      <div className="searchList">
        {this.createList()}
      </div>
    )
  }
});

module.exports = SearchList;
