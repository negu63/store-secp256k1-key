import { useState } from "react";

function App() {
  const [publicKey, setPublicKey] = useState("-");
  const [privateKey, setPrivateKey] = useState("-");

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
        <input type="button" value="Generate ECDSA Key" />
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