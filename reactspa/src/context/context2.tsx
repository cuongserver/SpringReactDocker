import { createContext, FunctionComponent, useState } from "react";

interface IContext2 {
  value: string;
  setValue: (value: string) => void;
}

const Context2 = createContext<IContext2 | null>(null);

const Context2Provider: FunctionComponent = (props) => {
  const [state, setState] = useState<IContext2>({
    value: "",
    setValue: (value) =>
      setState({
        ...state,
        value: value,
      }),
  });

  return <Context2.Provider value={state}>{props.children}</Context2.Provider>;
};

export { Context2, Context2Provider };
