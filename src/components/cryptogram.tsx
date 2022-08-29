import { useEffect } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { $iv, $salt } from "../recoil/atoms/aesAtom";
import { $encryptedPrivateKey } from "../recoil/selectors/encryptSelector";
import LabeledText from "./labeled-text";
import { db } from "../db";

export default function Cryptogram() {
  const salt = useRecoilValue($salt);
  const encryptedPrivateKey = useRecoilValueLoadable($encryptedPrivateKey);
  const iv = useRecoilValue($iv);

  useEffect(() => {
    if (
      encryptedPrivateKey.state !== "hasValue" ||
      encryptedPrivateKey.contents === "-"
    )
      return;

    async function saveKey() {
      await db.key.limit(1).modify({
        encryptedKey: encryptedPrivateKey.contents,
        salt,
        iv,
      });
    }
    saveKey();
  }, [encryptedPrivateKey, salt, iv]);

  return (
    <>
      <LabeledText label="IV" content={iv} />
      <LabeledText
        label="Encrypted private key"
        content={
          encryptedPrivateKey.state === "hasValue"
            ? encryptedPrivateKey.contents
            : "Calculating..."
        }
      />
    </>
  );
}
