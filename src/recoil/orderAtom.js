import { atom } from "recoil";
export const orderAtom = atom({
  key: "orderAtom",
  default: { list: [], current: null, status: "idle" },
});
