import { atom } from "recoil";

export const Moviedata = atom({
  key: "Moviedata",
  default: JSON.parse(window.localStorage.getItem("num") || "[]"),
});

export const login = atom({
  key: "login",
  default: false,
});

export const Name=atom({
  key:"Name",
  default:""
})





export const globaldata=atom({
  key:"globaldata",
  default:[]
})