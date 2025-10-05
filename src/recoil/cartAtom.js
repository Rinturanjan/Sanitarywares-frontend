import { atom } from "recoil";

export const cartAtom = atom({
  key: "cartAtom",
  default: { items: [], quantity: 0, totalAmount: 0 },
});

