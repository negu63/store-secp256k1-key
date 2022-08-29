import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { $iv, $salt, $symmetricKey } from "../recoil/atoms/aesAtom";
import { $privateKey } from "../recoil/atoms/ecdsaAtom";
import LabeledText from "./labeled-text";
import PasswordInput from "./password-input";
import * as secp from "@noble/secp256k1";
import * as bcrypt from "bcryptjs";
import { $decryptedPrivateKey } from "../recoil/atoms/validationAtom";

export default function AES() {
  const [salt, setSalt] = useRecoilState($salt);
  const [symmetricKey, setSymmetricKey] = useRecoilState($symmetricKey);
  const privateKey = useRecoilValue($privateKey);
  const setIV = useSetRecoilState($iv);
  const setDecryptedPrivateKey = useSetRecoilState($decryptedPrivateKey);

  function generateSymmetricKey(e: React.ChangeEvent<HTMLInputElement>) {
    if (privateKey !== "") {
      bcrypt.genSalt(10, function (err, salt) {
        setSalt(salt);

        bcrypt.hash(e.target.value, salt, async function (err, hash) {
          setSymmetricKey(
            secp.utils.bytesToHex(await secp.utils.sha256(Buffer.from(hash)))
          );

          setIV(
            Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString(
              "hex"
            )
          );

          setDecryptedPrivateKey("");
        });
      });
    }
  }

  return (
    <>
      <LabeledText label="Salt" content={salt} />
      <LabeledText label="Symmetric key" content={symmetricKey} />
      <PasswordInput eventHandler={generateSymmetricKey} />
    </>
  );
}
