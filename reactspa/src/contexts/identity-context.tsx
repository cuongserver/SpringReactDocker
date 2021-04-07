import { createContext, FC, useState } from "react";

interface IdentityContextValue {
  jwt: string;
  displayName: string;
  isLoggedIn: boolean;
}

interface IdentityCtx extends IdentityContextValue {
  setValue: (newState: IdentityContextValue) => void;
}

const IdentityContext = createContext<IdentityCtx | null>(null);

const IdentityContextProvider: FC = (props) => {
  const [state, setState] = useState<IdentityCtx>({
    jwt: "",
    displayName: "",
    isLoggedIn: false,
    setValue: (newState) =>
      setState({
        ...state,
        jwt: newState.jwt,
        displayName: newState.displayName,
        isLoggedIn: newState.isLoggedIn,
      }),
  });

  return (
    <IdentityContext.Provider value={state}>
      {props.children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityContextProvider };
