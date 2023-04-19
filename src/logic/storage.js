import { TURNS } from "../constants";

export const resetStorage = () => {
  window.localStorage.setItem("turn", JSON.stringify(TURNS.X));
  window.localStorage.setItem("counter", JSON.stringify([0, 0]));
};

export const updateStorage = (newTurn, newCounter) => {
  window.localStorage.setItem("turn", JSON.stringify(newTurn));
  window.localStorage.setItem("counter", JSON.stringify(newCounter));
};
