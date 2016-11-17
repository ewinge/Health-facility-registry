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
      levelString: ['none', 'country', 'province', 'district', 'facility'],
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
    query = query.toLowerCase();
    console.log("Search query:", query)

    var result = [];
    this.state.organizationUnits.forEach(function(orgUnit) {
      if(orgUnit.displayName.toLowerCase().indexOf(query) != -1)
      result.push(orgUnit);
    });

    this.state.queryResult = result;
    this.filter(this.state.filter);
  }

  //Filter from query results
  filter(filterBy) {
    console.log("Filter by:", filterBy)

    if (filterBy != "none") {
      var level = this.state.levelString.length;
      while (level--) {
        if (filterBy == this.state.levelString[level]) break;
      }

      var result = [];
        this.state.queryResult.forEach(function(orgUnit) {
          if(orgUnit.level == level) {
            result.push(orgUnit);
          }
      });

      this.state.filteredResult = result;

    } else {

      //If no filters are on, simply show the search query results
      this.state.filteredResult = this.state.queryResult;
    }

    this.emit("listChange");
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

  //Returns the levels' string version
  getLevelString() {
    return this.state.levelString;
  }

  //Gets a unit using an id
  getUnit(id) {
    var i = this.state.queryResult.length;
    while (i--) {
      if (this.state.queryResult[i].id == id) {
        return this.state.queryResult[i];
      }
    }
    return {}
  }

  //Returns the string equivalent of a level
  getLevelString(level) {
    if (level > 0 && level < this.state.levelString.length) {
        return this.state.levelString[level];
    }
    return "unknown (" + level + ")";
  }

  //Return the coordinates of the facilities in filteredResult
  getCoordinates() {
    var coords = [];

    var i = this.state.filteredResult.length;
    while (i--) {

      //Only facilities have coordinates
      if (this.state.filteredResult[i].hasOwnProperty("coordinates") && this.state.filteredResult[i].level == 4) {
        coords.push(this.stringToLatLng(this.state.filteredResult[i].coordinates));
      }
    }
    return coords;
  }

  //Converts string coordinates to LatLng object recgnized by google maps.
  //Format of coordinates: "[lng,lat]"
  stringToLatLng(coordsString) {
    const latLng = coordsString.replace("[", "").replace("]", "").split(",");
    return ({
      lat: parseFloat(latLng[1]),
      lng: parseFloat(latLng[0])
    })
  }

  handleActions(action) {
    console.log("Action received", action);

    switch(action.type) {
      case "QUERY": {
        this.search(action.query);
        break;
      }

      case "FILTER": {
        this.state.filter = action.filterBy;
        this.filter(action.filterBy);
        break;
      }

      case "LOCATE": {
        this.emit("locate", this.stringToLatLng(action.coords));
        break;
      }
    }
  }
}

const ouStore = new OUStore;
dispatcher.register(ouStore.handleActions.bind(ouStore));

export default ouStore;
