import React from "react";
import OUStore from "../stores/OUStore"
import Expandable from "./Expandable"

var SearchList = React.createClass({

  getInitialState: function () {
    return {
      items: OUStore.getQueryResult()
    };
  },

  //Gets filtered search query results from the OU store.
  getFilteredResult: function() {
    this.setState({
      items: OUStore.getFilteredResult()
    });
  },

  //Listen to list changes in OUStore
  componentWillMount: function() {
    OUStore.on("listChange", this.getFilteredResult);
  },

  createList: function() {
    var listItems = this.state.items.map(function(item, i) {

      //console.log(i, item.displayName); //For testing purposes
      return <Expandable key={item.id} id={item.id} orgUnit={item} />
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
