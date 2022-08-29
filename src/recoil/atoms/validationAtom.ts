import { atom } from "recoil";

const $decryptedPrivateKey = atom({
  key: "decryptedPrivateKey",
  default: "",
});

export { $decryptedPrivateKey };
