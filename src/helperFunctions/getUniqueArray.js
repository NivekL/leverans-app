export const getUniqueArray = (array, key) => (
    [...new Map(array.map(item =>
    [item[key], item])).values()]
)