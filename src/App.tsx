import { useState } from "react";
import * as secp from "@noble/secp256k1";
import * as bcrypt from "bcryptjs";
import { Buffer } from "buffer";

function App() {
  const [publicKey, setPublicKey] = useState("-");
  const [privateKey, setPrivateKey] = useState("-");
  const [salt, setSalt] = useState("-");
  const [symmetricKey, setSymmetricKey] = useState("-");
  const [iv, setIV] = useState("-");
  const [encryptedKey, setEncryptedKey] = useState("-");

  function generateECDSAKey() {
    const privateKey = secp.utils.randomPrivateKey();

    setPublicKey(secp.utils.bytesToHex(secp.getPublicKey(privateKey, true)));
    setPrivateKey(secp.utils.bytesToHex(privateKey));
  }

  function generateSymmetricKey(e: React.ChangeEvent<HTMLInputElement>) {
    if (privateKey != "-") {
      bcrypt.genSalt(10, function (err, salt) {
        setSalt(salt);

        bcrypt.hash(e.target.value, salt, async function (err, hash) {
          setSymmetricKey(
            secp.utils.bytesToHex(await secp.utils.sha256(Buffer.from(hash)))
          );
        });
      });
    }
  }

  async function generateIV() {
    setIV(
      Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("hex")
    );
  }

  async function encryptPrivateKey() {
    const key = await crypto.subtle.importKey(
      "raw",
      Buffer.from(symmetricKey, "hex"),
      { name: "AES-CBC" },
      false,
      ["encrypt", "decrypt"]
    );

    setEncryptedKey(
      await crypto.subtle
        .encrypt(
          { name: "AES-CBC", iv: Buffer.from(iv, "hex") },
          key,
          Buffer.from(privateKey, "hex")
        )
        .then(function (encrypted) {
          console.log(encrypted);
          return Buffer.from(encrypted).toString("hex");
        })
    );
  }
  return (
    <>
      <h3>Store secp256k1 private key in browser</h3>
      <hr />
      <br />
      <div>
        <div>Public key</div>
        <div>{publicKey}</div>
        <div>Private key</div>
        <div>{privateKey}</div>
        <br />
        <input type="button" value="Generate ECDSA Key" onClick={generateECDSAKey} />
        <br />
        <br />
        <br />
        <div>Salt</div>
        <div>-</div>
        <div>Symmetric key</div>
        <div>-</div>
        <div>Encrypted private key</div>
        <div>-</div>
        <br />
        <label htmlFor="password">
          <div>Password</div>
          <input type="password" name="password" id="password" />
        </label>
      </div>
    </>
  );
}

export default App;