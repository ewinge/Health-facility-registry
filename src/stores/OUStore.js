import { EventEmitter } from "events";
import dispatcher from "../dispatcher"
import { saveOrganisationUnit, loadUnit, loadAllUnits } from "../api"
import { handleLoadAllUnits } from "../actions/Actions";

class OUStore extends EventEmitter {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      organizationUnits: [],
      query: "",
      queryResult: [],
      filteredResult: [],
      filter: 'none',
      levelString: ['none', 'country', 'province', 'district', 'facility']
    };
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

  /**
   * Get the immediate children of the given parent
   */
  getChildrenOf(parentId) {
      //The root node has no parent
      const predicate = (parentId == "" ? unit => unit.parent == undefined : unit => unit.parent && unit.parent.id == parentId);
      return this.state.organizationUnits.filter(predicate);
  }

  /**
   * Check if the given node has children
   */
  hasChildren(id) {
      return this.getChildrenOf(id).length > 0;
  }

  //Returns the current search query
  getQuery() {
    return this.state.query;
  }

  //Returns the current filter
  getFilter() {
    return this.state.filter;
  }

  //Returns string version of levels
  getLevels() {
    return this.state.levelString;
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

  isLoading() {
    return this.state.isLoading;
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

  //Updates a unit.
  updateUnit(orgUnit) {

    //End if given org unit has no id property
    if (!orgUnit.hasOwnProperty("id")) {
      console.log("WARNING: Can't update unit with no id", orgUnit);
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

  removeUnit(id) {
    var i = this.state.organizationUnits.length;
    while (i--) {
      if (this.state.organizationUnits[i].id == id) {
        console.log("Unit deleted:", this.state.organizationUnits[i].displayName);
        this.state.organizationUnits.splice(i, 1);
        return;
      }
    }
  }

  //Parse string coordinates of feature type POINT
  parsePoint(point) {
    const coords = JSON.parse(point);
    return {lat: coords[1], lng: coords[0]};
  }

  //Parse string coordinates of feature type POLYGON
  parsePolygon(poly) {
    var points = [];
    try {
      //Polygons are formated as multipolygons (4 outer brackets)
      points = JSON.parse(poly)[0][0].map(coord => (
        {lat: coord[1], lng: coord[0]}
      ))
    } catch (e) {
      return [];
    }

    return points;
  }

  //Find the approximate center of polygon
  findPolygonCenter(poly) {
    var bounds = new google.maps.LatLngBounds();

    var len = poly.length;
    while (len--) {
      bounds.extend(poly[len]);
    }

    const center = bounds.getCenter();
    return {lat: center.lat(), lng: center.lng()};
  }

  //Finds an organization unit's center coordinates
  findUnitCenter(orgUnit) {
    var coords = [];
    switch (orgUnit.featureType) {
      case "POINT": { coords = this.parsePoint(orgUnit.coordinates); break; }
      case "POLYGON": { coords = this.findPolygonCenter(this.parsePolygon(orgUnit.coordinates)); break;}
      case "MULTI_POLYGON": { return null } //TODO
    }
    return coords;
  }

  //Handles actions by the components
  handleActions(action) {
    console.log("Action received:", action.type, action);

    switch(action.type) {
      case "QUERY": {
        this.state.query = action.query;
        this.search(action.query);
        break;
      }

      case "FILTER": {
        this.state.filter = action.filterBy;
        this.filter(action.filterBy);
        break;
      }

      case "LOCATE": {
        this.emit("locate", action.coords);
        break;
      }

      case "NEW_UNIT": {
        saveOrganisationUnit(action.newUnit);
        this.state.organizationUnits.push(action.newUnit);
        this.emit("unitChanged");
        break;
      }

      case "UPDATE_UNIT": {
        saveOrganisationUnit(action.updatedUnit)
            .then(() => loadUnit(action.updatedUnit.id)
                            .then(unit => this.updateUnit(unit))
                            .then(() => this.emit("unitChanged")));
        break;
      }

      case "FETCHING_UNITS": {
        console.log("Loading units...");
        break;
      }

      case "RECEIVED_UNITS": {
        this.state.organizationUnits = action.orgUnits;
        this.state.isLoading = false;
        this.emit("listReceived");
        console.log("Loading complete");
        break;
      }

      case "LOAD_FAILED": {
        this.emit("fetchFailed");
        break;
      }

      case "DELETE_UNIT": {
        this.removeUnit(action.id);
        this.emit("unitDeleted");
      }
    }
  }
}

const ouStore = new OUStore;
dispatcher.register(ouStore.handleActions.bind(ouStore));

export default ouStore;
