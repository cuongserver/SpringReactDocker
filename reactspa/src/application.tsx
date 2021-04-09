import React from "react";
import { Switch } from "react-router";
import { EnhancedRoute } from "components/shared/auth-route";
import { AppState } from "store/models";
import { useSelector } from "react-redux";

const LayoutEntry = React.lazy(() => import("layouts/layout-entry"));
const Home = React.lazy(() => import("views/view-home"));

const Application: React.FC = () => {
  const appState = useSelector<AppState, AppState>((state) => state);
  return (
    <React.Fragment>
      <React.Suspense fallback={"loading"}>
        <Switch>
          <EnhancedRoute
            isAuth={appState.identity.isLoggedIn}
            isLayoutRoute={true}
            path={["/login", "/signup", "/forgot-password"]}
            render={() => <LayoutEntry />}
          />
          <EnhancedRoute
            isAuth={appState.identity.isLoggedIn}
            path="/"
            render={() => <Home />}
          />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
};

export default Application;
