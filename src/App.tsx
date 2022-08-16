import { useState } from "react";
import * as secp from "@noble/secp256k1";

function App() {
  const [publicKey, setPublicKey] = useState("-");
  const [privateKey, setPrivateKey] = useState("-");

  function generateKey() {
    const privateKey = secp.utils.randomPrivateKey();

    setPublicKey(secp.utils.bytesToHex(secp.getPublicKey(privateKey, true)));
    setPrivateKey(secp.utils.bytesToHex(privateKey));
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
        <input type="button" value="Generate ECDSA Key" onClick={generateKey} />
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