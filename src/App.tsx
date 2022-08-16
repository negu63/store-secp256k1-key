import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (privateKey != "-" && symmetricKey != "-") {
      generateIV();
    }
  }, [symmetricKey]);

  useEffect(() => {
    if (iv != "-") {
      encryptPrivateKey();
    }
  }, [iv]);

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
      <h2>Store secp256k1 private key in browser</h2>
      <hr />
      <h3>ECDSA</h3>
      <div>
        <div>
          <b>Public key</b>
        </div>
        <div>{publicKey}</div>
        <br />
        <div>
          <b>Private key</b>
        </div>
        <div>{privateKey}</div>
        <br />
        <input
          type="button"
          value="Generate ECDSA Key"
          onClick={generateECDSAKey}
        />
        <br />
        <br />
        <br />
        <h3>AES-CBC</h3>
        <div>
          <b>Salt</b>
        </div>
        <div>{salt}</div>
        <br />
        <div>
          <b>Symmetric key</b>
        </div>
        <div>{symmetricKey}</div>
        <br />
        <label htmlFor="password">
          <div>
            <b>Password</b>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            onChange={generateSymmetricKey}
          />
        </label>
        <br />
        <br />
        <div>
          <b>IV</b>
        </div>
        <div>{iv}</div>
        <br />
        <div>
          <b>Encrypted private key</b>
        </div>
        <div>{encryptedKey}</div>
      </div>
    </>
  );
}

export default App;
