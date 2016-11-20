/**
 * `serverUrl` contains the api location of the server. You would generally get the baseUrl from the manifest.webapp
 * as described here http://dhis2.github.io/dhis2-docs/master/en/developer/html/apps_creating_apps.html
 *
 * `basicAuth` contains the username and password to send with the request as the basic authentication token. This is only needed when you develop locally and need CORS support (https://developer.mozilla.org/en-US/docs/Web/HTTP).
 * You obviously should not do this for your production apps.
 */
//const serverUrl = 'http://192.168.0.29:8082/api';
const serverUrl = 'https://play.dhis2.org/test/api';
const basicAuth = `Basic ${btoa('admin:district')}`;

/**
 * Default options object to send along with each request
 */
const fetchOptions = {
    method: 'GET',
    headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json',
    },
};

/**
 * `fetch` will not reject the promise on the a http request that is not 2xx, as those requests could also return valid responses.
 * We will only treat status codes in the 200 range as successful and reject the other responses.
 */
function onlySuccessResponses(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}

export function saveOrganisationUnit(organisationUnit) {
    console.log("saving: ", organisationUnit);
    const id = organisationUnit.id;
    //Should we POST a new unit, or update an existing one?
    const method = (id && id != "" ? "PUT" : "POST");
    return fetch(`${serverUrl}/organisationUnits`, Object.assign({}, fetchOptions, { method: method, body: JSON.stringify(organisationUnit) }))
        .then(onlySuccessResponses)
        // Parse the json response
        .then(response => response.json())
        // Log any errors to the console. (Should probably do some better error handling);
        .catch(error => console.error(error));
}

export function deleteOrganisationUnit(organisationUnit) {
    // Send DELETE request to the server to delete the organisation unit
    return fetch(
        `${serverUrl}/organisationUnits/${organisationUnit.id}`,
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
