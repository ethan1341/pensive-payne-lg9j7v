export const generateRandomNumber = (low: number, high: number): number => {
  const randomNum = Math.trunc(
    Math.floor(Math.random() * (high - low + 1)) + low
  );
  console.log(randomNum);
  return randomNum;
};
