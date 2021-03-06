import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { search, advancedSearch, filter } from "../utils/SearchUtils";

class OUStore extends EventEmitter {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      organizationUnits: [],
      query: {},
      queryResult: [],
      filteredResult: [],
      filter: 'facility',
      levelString: ['none', 'country', 'province', 'district', 'facility']
    };
  }

  //Search orgunits
  search(query, property) {
    console.log("Search query:", query)
    this.state.queryResult = search(this.state.organizationUnits, query);
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

      this.state.filteredResult = filter(this.state.queryResult, "level", level);
    } else {

      //If no filters are on, simply show the search query results
      this.state.filteredResult = this.state.queryResult;
    }

    this.emit("listChange");
  }

  //Adds child facilities to filteredResult
  addChildFacilities(children) {
    var len = children.length;

    while (len--) {
      const unit = this.getUnit(children[len].id);

      if (unit.level < 4 && unit.level > 0) {
        this.addChildFacilities(unit.children);
      } else {

        //Check if unit is already in the list first
        if (this.state.filteredResult.indexOf(unit) == -1) {
          this.state.filteredResult.push(unit);
        }
      }
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

  //The unit being edited
  getEditing() {
      return this.state.isEditing;
  }

  //The parent of the unit being edited
  getEditParent() {
      return this.state.isEditingParent;
  }

  //Gets a unit using an id
  getUnit(id) {
    var i = this.state.organizationUnits.length;
    while (i--) {
      if (this.state.organizationUnits[i].id == id) {
        return this.state.organizationUnits[i];
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

  //Removes the organisation unit from the store
  removeUnit(id) {
    var i = this.state.organizationUnits.length;
    while (i--) {
      if (this.state.organizationUnits[i].id == id) {
        console.log("Unit deleted:", this.state.organizationUnits[i].displayName);
        this.state.organizationUnits.splice(i, 1);

        //Also remove from filtered list
        var j = this.state.filteredResult.length;
        while (j--) {
          if (this.state.filteredResult[j].id == id) {
            this.state.filteredResult.splice(j, 1);
          }
        } 

        this.emit("listChange");
        return;
      }
    }
  }

  //Helper to end editing
  closeForm() {
      this.state.isEditing = false;
      this.state.isEditingParent = false;
      this.emit("editing");
  }

  //Handles actions by the components
  handleActions(action) {
    console.log("Action received:", action.type, action);

    switch(action.type) {
      case "QUERY": {
        this.state.query = action.query;
        this.search(action.query, action.property);
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

      case "VIEW_FACILITIES": {
        this.addChildFacilities(action.children);
        break;
      }

      case "NEW_UNIT": {
        this.state.organizationUnits.push(action.newUnit);
        this.emit("unitChanged");
        this.closeForm();
        break;
      }

      case "UPDATE_UNIT": {
        this.updateUnit(action.updatedUnit);
        this.emit("unitChanged");
        this.closeForm();
        break;
      }

      case "EDIT_UNIT": {
          this.state.isEditing = action.id;
          this.state.isEditingParent = action.parent;
          this.emit("editing");
          break;
        }

      case "CANCEL_EDIT": {
          this.closeForm();
          this.emit("cancelEdit");
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
        break;
      }
    }
  }
}

const ouStore = new OUStore;
dispatcher.register(ouStore.handleActions.bind(ouStore));

export default ouStore;
