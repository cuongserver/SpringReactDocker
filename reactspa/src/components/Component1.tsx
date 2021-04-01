import { FC, memo } from "react";

export const Component1: FC = memo(() => {
  const getColor = () => Math.floor(Math.random() * 255);
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`,
  };
  return <p style={style}>Rerendered</p>;
});
