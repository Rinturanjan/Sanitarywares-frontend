import { atom } from "recoil";
export const uiAtom = atom({
  key: "uiAtom",
  default: { darkMode: false, sidebarOpen: false, loading: false },
});
