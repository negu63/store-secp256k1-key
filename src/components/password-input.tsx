interface PasswordInputProps {
  eventHandler: Function;
}

export default function PasswordInput({ eventHandler }: PasswordInputProps) {
  return (
    <>
      <div>
        <b>Password</b>
      </div>
      <input type="password" onChange={(e) => eventHandler(e)} />
      <br />
      <br />
    </>
  );
}
