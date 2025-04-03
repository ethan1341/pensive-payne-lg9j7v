type props = {
  message: string;
};

export const Hint: React.FC<props> = ({ message }) => {
  return <div>{message}</div>;
};
