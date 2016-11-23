import dispatcher from "../dispatcher";
import { loadAllUnits, deleteOrganisationUnit } from "../api"

//Called when a new search query in entered
export function handleQuery(input) {
  dispatcher.dispatch({
    type: "QUERY",
    query: input
  })
}

//Called when new filter is set
export function handleFilter(input) {
  dispatcher.dispatch({
    type: "FILTER",
    filterBy: input
  })
}

//Called when a locate button is presed
export function handleLocate(input) {
  dispatcher.dispatch({
    type: "LOCATE",
    coords: input
  })
}

//Updates the unit with the parameter unit's id
export function handleUpdate(input) {
  dispatcher.dispatch({
    type: "UPDATE_UNIT",
    updatedUnit: input
  })
}

//Called when a new unit is to be added to the local store
export function handleNewUnit(input) {
  dispatcher.dispatch({
    type: "NEW_UNIT",
    newUnit: input
  })
}

//Called to load all organization units
export function handleLoadAllUnits() {
  dispatcher.dispatch({
    type: "FETCHING_UNITS"
  })

  var orgUnits = loadAllUnits().then((organisationUnits) => {
    dispatcher.dispatch({
      type: "RECEIVED_UNITS",
      orgUnits: organisationUnits
    })

  }).catch((e) => {
    dispatcher.dispatch({
      type: "LOAD_FAILED"
    })
  })
}

//Deletes a unit with unitID from the OUStore
export function handleDelete(unit) {
  deleteOrganisationUnit(unit.id).then(() => {
    dispatcher.dispatch({
      type: "DELETE_UNIT",
      id: unit.id
    })
  }) 
}
