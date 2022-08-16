function App() {
  return (
    <>
    <h3>Test</h3>
      <div>
        <div>Public key</div>
        <div>-</div>
        <div>Private key</div>
        <div>-</div>
        <input type="button" value="Generate ECDSA Key" />
        <hr/>
        <div>Salt</div>
        <div>-</div>
        <div>Symmetric key</div>
        <div>-</div>
        <div>Encrypted private key</div>
        <div>-</div>
        <label htmlFor="password">
          <div>Password</div>
          <input type="password" name="password" id="password" />
        </label>
      </div>
    </>
  );
}

export default App;
