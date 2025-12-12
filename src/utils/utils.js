/**
 * Takes an object and a list of desired fields and then returns a object containing only the desired fields.
 * @param {Object} obj  Object to be filtered.
 * @param {Array} allowedFields  An array of desired fields.
 * @returns {Object} Returns a filtered object that only has the desired fields as properties.
 */
export function filterObject(obj, allowedFields) {
  return Object.entries(obj).reduce((filteredObj, [key, value]) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = value;
    }
    return filteredObj;
  }, {});
}
