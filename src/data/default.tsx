import { generateRandomNumber } from "../utility/util";

export const low = 1;
export const high = 10;

export type GameState = {
  lowThreshold: number;
  highThreshold: number;
  guessedNumber: number | string;
  actualNumber: number;
};

export const defaultState: GameState = {
  lowThreshold: low,
  highThreshold: high,
  guessedNumber: "",
  actualNumber: generateRandomNumber(low, high),
};
