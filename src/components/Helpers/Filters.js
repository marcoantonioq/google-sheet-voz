
/**
 * Função agrupo por propriedade
 * @param {array} objectArray Array de valores
 * @param {string} property Propriedade filtrada
 * @returns array
 */
export function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj, index) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push({ key: index, ...obj });
    return acc;
  }, {});
}
