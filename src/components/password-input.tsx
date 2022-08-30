import debounce from "lodash/debounce";

interface PasswordInputProps {
  eventHandler: Function;
}

export default function PasswordInput({ eventHandler }: PasswordInputProps) {
  return (
    <>
      <div>
        <b>Password</b>
      </div>
      <input
        type="password"
        onChange={debounce((e) => eventHandler(e), 200)}
      />
      <br />
      <br />
    </>
  );
}
