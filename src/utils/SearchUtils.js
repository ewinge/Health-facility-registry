//Find object in 'list' with 'property' containing 'query'
//List must be an array of objects, query must be an object
export function search(list, query) {

  //Query must be an object
  if (typeof query !== 'object') { return [];}

  var currentResult = list;
  var result = [];

  for (var property in query) {
    if (query.hasOwnProperty(property)) {

      currentResult.forEach(function(unit) {
        if (unit.hasOwnProperty(property)) {
          if(unit[property].toLowerCase().indexOf(query[property].toLowerCase()) != -1) {
            result.push(unit);
          }
        }
      });

      currentResult = result;
      result = [];
    }
  }

  return currentResult;
}

//Find object in 'list' with 'property' containing EXACTLY 'query'
//List must be an array of objects
export function filter(list, property, filterBy) {
  var result = [];
  list.forEach(function(unit) {
    if (unit.hasOwnProperty(property)) {
      if(unit[property] == filterBy) {
        result.push(unit);
      }
    }
  });

  return result;
}

//Find object in 'list' with 'property' containing 'query'
//List must be an array of objects
export function search_OLD(list, property, query) {
  query = query.toLowerCase();

  var result = [];
  list.forEach(function(unit) {
    if (unit.hasOwnProperty(property)) {
      if(unit[property].toLowerCase().indexOf(query) != -1) {
        result.push(unit);
      }
    }
  });

  return result;
}
