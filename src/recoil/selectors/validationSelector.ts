import { selector } from "recoil";
import { $publicKey } from "../atoms/ecdsaAtom";
import { $decryptedPrivateKey } from "../atoms/validationAtom";
import * as secp from "@noble/secp256k1";

const $isValidPassword = selector({
  key: "isValidPassword",
  get: ({ get }) => {
    const decryptedPrivateKey = get($decryptedPrivateKey);
    const publicKey = get($publicKey);

    try {
      const decryptedPublicKey = Buffer.from(
        secp.getPublicKey(Buffer.from(decryptedPrivateKey, "hex"), true)
      ).toString("hex");
      
      return decryptedPublicKey === publicKey;
    } catch {
      return false;
    }
  },
});

export { $isValidPassword };
