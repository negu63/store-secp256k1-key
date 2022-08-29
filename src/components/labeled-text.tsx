interface LabeledTextProps {
  label: string;
  content: string;
}

export default function LabeledText({ label, content }: LabeledTextProps) {
  return (
    <>
      <div>
        <b>{label}</b>
      </div>
      <div>{content}</div>
      <br />
    </>
  );
}
