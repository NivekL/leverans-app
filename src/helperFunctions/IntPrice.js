export const displayCost = (cost) => {
  if (cost === undefined) {
    return;
  }
  let formattedCost = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(cost);
  return formattedCost;
};
