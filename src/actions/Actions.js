import dispatcher from "../dispatcher";
import { saveOrganisationUnit, loadAllUnits, deleteOrganisationUnit, loadUnit } from "../api"

//Called when a new search query in entered
export function handleQuery(input) {
  dispatcher.dispatch({
    type: "QUERY",
    query: input
  })
}

//Called when "show facilities" button is pressed
//Input should be an list of objects containing children id
export function handleViewFacilities(input) {
  dispatcher.dispatch({
    type: "VIEW_FACILITIES",
    children: input
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
  saveOrganisationUnit(input)
      .then(() => loadUnit(input.id)
          .then(unit =>
            dispatcher.dispatch({
              type: "UPDATE_UNIT",
              updatedUnit: unit
            })))
}

//open the edit form
export function startEdit(id, parent) {
    dispatcher.dispatch({
        type: "EDIT_UNIT",
        id: id,
        parent: parent
    });
}

//Close/cancel edit form
export function cancelEdit() {
    dispatcher.dispatch({
        type: "CANCEL_EDIT"
    });
}

//Called when a new unit is to be added to the local store
export function handleNewUnit(input) {
  saveOrganisationUnit(input)
      .then(response => loadUnit(response.response.uid)
          .then(unit =>
                dispatcher.dispatch({
                  type: "NEW_UNIT",
                  newUnit: unit
                })));
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
