import dispatcher from "../dispatcher";

export function handleQuery(input) {
  dispatcher.dispatch({
    type: "QUERY",
    query: input
  })
}

export function handleFilter(input) {
  dispatcher.dispatch({
    type: "FILTER",
    filterBy: input
  })
}

export function handleLocate(input) {
  dispatcher.dispatch({
    type: "LOCATE",
    coords: input
  })
}
