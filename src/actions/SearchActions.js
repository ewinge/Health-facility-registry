import dispatcher from "../dispatcher";

export function saveResults(result) {
  dispatcher.dispatch({
    type: "SUBMIT",
    orgUnits: result
  })
}
