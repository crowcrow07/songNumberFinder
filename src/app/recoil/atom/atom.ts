import { atom } from "recoil";

export const searchKeywordInput = atom({
  key: "searchKeywordInputAtom",
  default: {
    title: "",
    singer: "",
  },
});

export const searchKeywordType = atom({
  key: "searchKeywordType",
  default: "title",
});
