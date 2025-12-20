export const getPlateClassName = (weight) => {
  return `plate-${String(weight).replace(".", "-")}`;
};
