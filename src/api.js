/**
 *  setup for test/development mode
 */
var production = false;
//var serverUrl = 'http://localhost:8082/api';
const testURL = 'https://play.dhis2.org/demo/api';
const basicAuth = `Basic ${btoa('admin:district')}`;

/**
 * Setup for production mode
 */
const manifest = require('json!../manifest.webapp');
const URL = manifest.activities.dhis.href;
console.log("manifest:", manifest, URL);

//Check if we are running development or production mode
if (URL && URL != "*") {
    var productionURL = URL  + "/api";
    production  = true;
}

const headers = production ? { 'Content-Type': 'application/json' } : {Authorization: basicAuth, 'Content-Type': 'application/json' };
const serverUrl = production ? productionURL : testURL;

console.log("serverUrl:", serverUrl, "headers:", headers);

/**
 * Default options object to send along with each request
 */
const fetchOptions = {
    method: 'GET',
    headers: headers
};

/**
 * `fetch` will not reject the promise on the a http request that is not 2xx, as those requests could also return valid responses.
 * We will only treat status codes in the 200 range as successful and reject the other responses.
 */
function onlySuccessResponses(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        console.log("Request failed:", response);
        alert(`Request failed: ${response.statusText}`);
        return Promise.reject(response);
    }
}

export function saveOrganisationUnit(organisationUnit) {
    const id = organisationUnit.id;
    let method, URL;
    if (id && id != "") { //Should we POST a new unit, or update an existing one?
        method = "PUT";
        URL = `${serverUrl}/organisationUnits/${id}`;
    } else {
        method = "POST";
        URL = `${serverUrl}/organisationUnits`;
    }

    console.log("saving: ", method, organisationUnit);

    return fetch(URL, Object.assign({}, fetchOptions, { method: method, body: JSON.stringify(organisationUnit) }))
        .then(onlySuccessResponses)
        // Parse the json response
        .then(response => response.json())
        // Log any errors to the console.
        .catch(error => console.error(error));
}

export function deleteOrganisationUnit(id) {
    console.log("deleting:", id);
    // Send DELETE request to the server to delete the organisation unit
    return fetch(
        `${serverUrl}/organisationUnits/${id}`,
        {
            headers: fetchOptions.headers,
            method: 'DELETE',
        }
    )
    .then(onlySuccessResponses);
}

export function loadOrganisationUnits(parent) {
    // Load the organisation units but only the first level and the do not use paging
    return fetch(`${serverUrl}/organisationUnits/${parent}?paging=false&level=1`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        // pick the organisationUnits property from the payload
        .then(({ organisationUnits }) => organisationUnits);
}

export function searchOrganisationUnits(parent, input) {
    // Load the organisation units but only the first level and the do not use paging
    return fetch(`${serverUrl}/organisationUnits/${parent}?paging=false&filter=name:ilike:` + input, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        // pick the organisationUnits property from the payload
        .then(({ organisationUnits }) => organisationUnits);
}

//Loads a single unit with the id
export function loadUnit(id) {
    console.log("loadUnit:", id);
    return fetch(`${serverUrl}/organisationUnits/${id}`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
}

//Loads all units
export function loadAllUnits() {
    return fetch(`${serverUrl}/organisationUnits/?paging=false&fields=:all`, fetchOptions)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ organisationUnits }) => organisationUnits);
}
