import { useRecoilState } from "recoil";
import { $privateKey, $publicKey } from "../recoil/atoms/ecdsaAtom";
import * as secp from "@noble/secp256k1";
import LabeledText from "./labeled-text";

export default function ECDSA() {
  const [publicKey, setPublicKey] = useRecoilState($publicKey);
  const [privateKey, setPrivateKey] = useRecoilState($privateKey);

  function generateECDSAKeyPair() {
    const privateKey = secp.utils.randomPrivateKey();

    setPublicKey(secp.utils.bytesToHex(secp.getPublicKey(privateKey, true)));
    setPrivateKey(secp.utils.bytesToHex(privateKey));
  }

  return (
    <>
      <LabeledText label={"Public key"} content={publicKey} />
      <LabeledText label={"Private key"} content={privateKey} />
      <input
        type="button"
        value="Generate ECDSA key pair"
        onClick={generateECDSAKeyPair}
      />
      <br />
      <br />
    </>
  );
}
