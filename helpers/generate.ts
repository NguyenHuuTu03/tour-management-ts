export const generateOrderCode = (number: number) => {
  const code = `ORD${String(number).padStart(3, "0")}`;
  return code;
};
export const generateTourCode = (number: number) => {
  const code = `TUR${String(number).padStart(3, "0")}`;
  return code;
};
