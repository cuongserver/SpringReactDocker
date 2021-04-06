import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { anonymousPaths } from "configs/common";

interface EnhancedRouteProps extends RouteProps {
  isAuth?: boolean;
  redirectIfNotAuth?: string;
  isLayoutRoute?: boolean;
}

export const EnhancedRoute: React.FC<EnhancedRouteProps> = (
  props: EnhancedRouteProps
) => {
  const isAuth = props.isAuth ?? false;
  const redirectIfNotAuth = props.redirectIfNotAuth ?? anonymousPaths.login;
  const isLayoutRoute = props.isLayoutRoute ?? false;
  if (isLayoutRoute && !Array.isArray(props.path))
    throw new Error("path for layout route must be array");
  if (!isLayoutRoute && Array.isArray(props.path))
    throw new Error("path for non-layout route can't be array");
  if (Array.isArray(props.path)) return <Route {...props} />;
  if (isAuth && Object.values(anonymousPaths).includes(props.path as string)) {
    return (
      <Route
        {...props}
        render={() => (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )}
      />
    );
  }

  if (
    !isAuth &&
    !Object.values(anonymousPaths).includes(props.path as string)
  ) {
    return (
      <Route
        {...props}
        render={() => (
          <Redirect
            to={{
              pathname: redirectIfNotAuth,
              state: {
                from: props.path,
              },
            }}
          />
        )}
      />
    );
  }
  return <Route {...props} />;
};
