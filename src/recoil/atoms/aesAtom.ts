import { atom } from "recoil";

const $salt = atom({
  key: "salt",
  default: "-",
});

const $symmetricKey = atom({
  key: "symmetricKey",
  default: "-",
});

const $iv = atom({ key: "iv", default: "-" });

export { $salt, $symmetricKey, $iv };
