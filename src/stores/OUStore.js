import { EventEmitter } from "events";
import dispatcher from "../dispatcher"
import { loadUnit, loadAllUnits } from "../api"

class OUStore extends EventEmitter {
  constructor() {
    super()

    this.state = {
      organizationUnits: [],
      queryResult: [],
      filteredResult: [],
      filter: 'none',
    };

    //Loads all organization units from the start
    loadAllUnits().then((organisationUnits) => {
      this.init(organisationUnits);
    });
  }

  init(data) {
    this.state.organizationUnits = data;
  }

  //Search from all units
  search(query) {
    console.log("Search query:", query)

    var result = [];
    this.state.organizationUnits.forEach(function(orgUnit) {
      if(orgUnit.displayName.toLowerCase().indexOf(query) != -1)
      result.push(orgUnit);
    });

    this.state.queryResult = result;

    //If a filter is currently on, filter search query results
    if (this.state.filter == 'none') {
      this.emit("searchChange");

    } else {
      this.filter(this.state.filter);

    }
  }

  //Filter from query results
  filter(filterBy) {
    console.log("Filter by:", filterBy)

    var level = 0
    switch(filterBy) {
      case "facility": { level = 4; break;}
      case "province": { level = 2; break;}
      case "district": { level = 3; break;}
      case "country": { level = 1; break;}
    }

    var result = [];
    if (filterBy != "none") {
      this.state.queryResult.forEach(function(orgUnit) {
          if(orgUnit.level == level) {
            result.push(orgUnit);
          }
      });

      this.state.filteredResult = result;

      //Emits a "filterChange" signal that SearchList listens to
      this.emit("filterChange");
    } else {

      //If no filters are on, simply show the search query results
      this.emit("searchChange");
    }
  }

  //Returns all organization units
  getAll() {
    return this.state.organizationUnits;
  }

  //Returns the search query results
  getQueryResult() {
    return this.state.queryResult;
  }

  //Returns the filtered results
  getFilteredResult() {
    return this.state.filteredResult;
  }

  //Gets a unit using an id
  getUnit(id) {
    for (var i = 0; i < this.state.queryResult.length; i++) {
      if (this.state.queryResult[i].id == id) {
        return this.state.queryResult[i];
      }
    }
    return {}
  }

  handleActions(action) {
    console.log("Action received:", action);

    switch(action.type) {
      case "QUERY": {
        this.search(action.query);
        break;
      }

      case "FILTER": {
        this.state.filter = action.filterBy
        this.filter(action.filterBy);
        break;
      }

      //More actions here
    }
  }
}

const ouStore = new OUStore;
dispatcher.register(ouStore.handleActions.bind(ouStore));

export default ouStore;
