import React from "react";
import OUStore from "../stores/OUStore"
import Expandable from "./Expandable"

var SearchList = React.createClass({

  getInitialState: function () {
    return {
      items: OUStore.getQueryResult(),
      loading: OUStore.isLoading(),
      error: false
    };
  },

  //Gets filtered search query results from the OU store.
  getFilteredResult: function() {
    this.setState({
      items: OUStore.getFilteredResult()
    });
  },

  setLoading: function() {
    this.setState({
      loading: true
    });
  },

  doneLoading: function() {
    this.setState({
      loading: false
    });
  },

  loadError: function() {
    this.setState({
      error: true
    });
  },

  //Listen to list changes in OUStore
  componentWillMount: function() {
    OUStore.on("listChange", this.getFilteredResult);
    OUStore.on("listReceived", this.doneLoading);
    OUStore.on("fetchFailed", this.loadError);
  },

  //Unlisten upon dismounting
  componentWillUnmount: function() {
    OUStore.removeListener("listChange", this.getFilteredResult);
    OUStore.removeListener("listReceived", this.doneLoading);
    OUStore.removeListener("fetchFailed", this.loadError);
  },

  createList: function() {

    //Don't attempt to create list if fetching data failed
    if (this.state.error) {
      return <p><b><font color="red">Failed to fetch data from server.</font></b></p>
    }

    //Don't attempt to create list while the units are still loading
    if (this.state.loading) {
      return <p><b>Loading units...</b></p>
    }

    var listItems = this.state.items.map(function(item, i) {

      //console.log(i, item.displayName); //For testing purposes
      return <Expandable key={item.id} id={item.id} orgUnit={item} />
    });

    if (listItems.length == 0) {
      return <p></p>;
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
