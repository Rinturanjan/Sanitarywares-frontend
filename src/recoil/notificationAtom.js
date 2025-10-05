import { atom } from "recoil";
export const notificationAtom = atom({
  key: "notificationAtom",
  default: { message: "", type: "" }, // type: success | error | info
});
