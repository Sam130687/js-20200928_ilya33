/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const arr = Object.entries(obj);
    const arrNew = [];
    const n = arr.length;
    for (let i = 0; i < n; i++){
      console.log(arr[i][0]);
      console.log(fields.indexOf(arr[i][0]));
      if (fields.indexOf(arr[i][0]) === -1){
        arrNew.push(arr[i]);
      }
    }
    return Object.fromEntries(arrNew);
};
