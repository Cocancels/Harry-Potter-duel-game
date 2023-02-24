export const isEven = (number: number) => {
  return number % 2 === 0;
};

export const isOdd = (number: number) => {
  return !isEven(number);
};
