import { selector } from "recoil";
import { $privateKey } from "../atoms/ecdsaAtom";
import { $decryptedPrivateKey } from "../atoms/validationAtom";

const $isValidPassword = selector({
  key: "isValidPassword",
  get: ({ get }) => {
    const decryptedPrivateKey = get($decryptedPrivateKey);
    const privateKey = get($privateKey);
    return decryptedPrivateKey === privateKey;
  },
});

export { $isValidPassword };
