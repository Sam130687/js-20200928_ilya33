/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const arr = Object.entries(obj);
  const arrNew = [];
  const n = arr.length;
  for (let i = 0; i < n; i++){
    if (fields.indexOf(arr[i][0]) > -1){
      arrNew.push(arr[i]);
    }
  }
  return Object.fromEntries(arrNew);
};
