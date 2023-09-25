import { atom } from "recoil";

export const Moviedata = atom({
  key: "Moviedata",
  default: JSON.parse(window.localStorage.getItem("num") || "[]"),
});

export const login = atom({
  key: "login",
  default: false,
});
