type props = {
  text: string;
  callback: () => void;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<props> = ({
  text,
  callback,
  disabled,
}) => {
  return (
    <button disabled={disabled} className="button" onClick={callback}>
      {text}
    </button>
  );
};
