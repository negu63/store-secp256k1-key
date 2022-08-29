import LabeledText from "./labeled-text";
import PasswordInput from "./password-input";
import { db } from "../db";
import * as secp from "@noble/secp256k1";
import * as bcrypt from "bcryptjs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { $isValidPassword } from "../recoil/selectors/validationSelector";
import { $decryptedPrivateKey } from "../recoil/atoms/validationAtom";

interface Key {
  encryptedKey: string;
  salt: string;
  iv: string;
}

export default function Validation() {
  const setDecryptedPrivateKey = useSetRecoilState($decryptedPrivateKey);
  const isValidPassword = useRecoilValue($isValidPassword);

  async function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const key = (await db.key.limit(1).toArray())[0] as Key;

    bcrypt.hash(e.target.value, key.salt, async function (err, hash) {
      const symKey = await secp.utils.sha256(Buffer.from(hash));

      const decryptKey = await crypto.subtle.importKey(
        "raw",
        symKey,
        {
          name: "AES-CBC",
        },
        false,
        ["decrypt"]
      );

      await crypto.subtle
        .decrypt(
          { name: "AES-CBC", iv: Buffer.from(key.iv, "hex") },
          decryptKey,
          Buffer.from(key.encryptedKey, "hex")
        )
        .then(function (dec) {
          setDecryptedPrivateKey(Buffer.from(dec).toString("hex"));
        })
        .catch(function (err) {
          setDecryptedPrivateKey("-");
        });
    });
  }

  return (
    <>
      <LabeledText
        label="Is the password valid?"
        content={`${isValidPassword}`}
      />
      <PasswordInput eventHandler={validatePassword} />
    </>
  );
}
