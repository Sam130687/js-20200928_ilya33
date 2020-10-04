/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') { 
    const arrNew = [...arr];
    const n = arrNew.length;
    let sort = param === 'asc'? -1 : 1;
    for (let i = 1; i < n; i++) {          
      let current = arrNew[i];
      let j = i-1; 
        while ((j > -1) && ((current.localeCompare(arrNew[j], 'ru',  {caseFirst: 'upper'})) === sort)) {
          arrNew[j+1] = arrNew[j];
          j--;
        }
        arrNew[j+1] = current;
      }
    return arrNew;
}
