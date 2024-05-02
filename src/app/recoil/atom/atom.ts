import { atom } from "recoil";

export const searchKeywordList = atom({
  key: "searchKeywordListAtom",
  default: [],
});

export const searchKeywordInput = atom({
  key: "searchKeywordInputAtom",
  default: "",
});
