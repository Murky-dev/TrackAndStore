export function filterObject(obj, allowedFields) {
  return Object.entries(obj).reduce((filteredObj, [key, value]) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = value;
    }
    return filteredObj;
  }, {});
}
