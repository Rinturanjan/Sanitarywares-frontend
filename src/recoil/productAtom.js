import { atom } from "recoil";
export const productAtom = atom({
  key: "productAtom",
  default: { products: [], selectedCategory: "", searchTerm: "", sortOption: "newest", loading: false },
});
