import { atom } from "recoil";
export const wishlistAtom = atom({
  key: "wishlistAtom",
  default: { items: [] },
});
