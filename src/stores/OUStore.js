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

    this.loadUnits();
  }

  //Loads all organization units from the start
  loadUnits() {

    //From the api
    loadAllUnits().then((organisationUnits) => {
      this.state.organizationUnits = organisationUnits;
    });
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

  //Updates a unit.
  updateUnit(orgUnit) {

    console.log("KOM HIT!");
    //End if given org unit has no id property
    if (!orgUnit.hasOwnProperty("id")) {
      console.log("WARNING: Not update unit with no id", orgUnit);
      return;
    }

    var i = this.state.organizationUnits.length;
    while (i--) {
      if (this.state.organizationUnits[i].id == orgUnit.id) {
        this.state.organizationUnits[i] = orgUnit;
        return;
      }
    }

    //If no org units with a the same id as the one given, error
    console.log("WARNING: No org unit found with this id:", orgUnit.id);
  }

  //Handles actions by the components
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

      case "RELOAD": {
        loadUnits();
        break;
      }

      case "NEW_UNIT": {
        this.state.organizationUnits.push(action.newUnit);
        break;
      }

      case "UPDATE_UNIT": {
        this.updateUnit(action.updatedUnit);
        break;
      }
    }
  }
}

const ouStore = new OUStore;
dispatcher.register(ouStore.handleActions.bind(ouStore));

export default ouStore;
