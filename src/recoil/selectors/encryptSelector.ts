import { selector } from "recoil";
import { $iv, $symmetricKey } from "../atoms/aesAtom";
import { $privateKey } from "../atoms/ecdsaAtom";

const $encryptedPrivateKey = selector({
  key: "encryptedPrivateKey",
  get: async ({ get }) => {
    const privateKey = get($privateKey);
    const symmetricKey = get($symmetricKey);
    const iv = get($iv);

    if (privateKey === "-" || symmetricKey === "-" || iv === "-") return "-";

    const key = await crypto.subtle.importKey(
      "raw",
      Buffer.from(symmetricKey, "hex"),
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );

    const encrypted = await crypto.subtle
      .encrypt(
        {
          name: "AES-CBC",
          iv: Buffer.from(iv, "hex"),
        },
        key,
        Buffer.from(privateKey, "hex")
      )
      .then(function (enc) {
        return Buffer.from(enc).toString("hex");
      });

    return encrypted;
  },
});

export { $encryptedPrivateKey };
