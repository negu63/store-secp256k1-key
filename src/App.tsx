import { RecoilRoot } from "recoil";
import ECDSA from "./components/ecdsa";
import AES from "./components/aes";
import Cryptogram from "./components/cryptogram";
import Validation from "./components/validation";

function App() {
  return (
    <>
      <RecoilRoot>
        <h1>Store secp256k1 private key in browser</h1>
        <hr />
        <h3>ECDSA</h3>
        <ECDSA />
        <hr />
        <h3>AES-CBC</h3>
        <AES />
        <hr />
        <h3>Cryptogram</h3>
        <Cryptogram />
        <hr />
        <h2>Validation</h2>
        <Validation />
      </RecoilRoot>
    </>
  );
}

export default App;
