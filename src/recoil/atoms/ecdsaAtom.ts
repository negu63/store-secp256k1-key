import { atom } from "recoil";

const $publicKey = atom({
  key: "publicKey",
  default: "-",
});

const $privateKey = atom({
  key: "privateKey",
  default: "-",
});

export { $publicKey, $privateKey };
