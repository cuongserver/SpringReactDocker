import React, { ComponentProps, FC } from "react";
import { Context1Provider } from "contexts/context1";
import { Context2Provider } from "contexts/context2";
import { IdentityContextProvider } from "./identity-context";

const combineComponents = (...components: FC[]): FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <React.Fragment>{children}</React.Fragment>
  );
};

const providers = [Context1Provider, Context2Provider, IdentityContextProvider];

export const AppContext = combineComponents(...providers);
