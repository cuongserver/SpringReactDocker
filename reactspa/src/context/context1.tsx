import { createContext, FunctionComponent, useState } from "react";

interface IContext1 {
  value: string;
  setValue: (value: string) => void;
}

const Context1 = createContext<IContext1 | null>(null);

const Context1Provider: FunctionComponent = (props) => {
  const [state, setState] = useState<IContext1>({
    value: "",
    setValue: (value) =>
      setState({
        ...state,
        value: value,
      }),
  });

  return <Context1.Provider value={state}>{props.children}</Context1.Provider>;
};

export { Context1, Context1Provider };
