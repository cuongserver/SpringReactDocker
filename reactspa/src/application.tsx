import React from "react";
import { Switch } from "react-router";
import { EnhancedRoute } from "components/shared/auth-route";
import { IdentityContext } from "./contexts/identity-context";

const LayoutEntry = React.lazy(() => import("layouts/layout-entry"));
const Home = React.lazy(() => import("views/view-home"));
const Application: React.FC = React.memo(() => {
  const ctx = React.useContext(IdentityContext)!;
  return (
    <React.Fragment>
      <React.Suspense fallback={"loading"}>
        <Switch>
          <EnhancedRoute
            isAuth={ctx.isLoggedIn}
            isLayoutRoute={true}
            path={["/login", "/signup", "/forgot-password"]}
            render={() => <LayoutEntry />}
          />
          <EnhancedRoute
            isAuth={ctx.isLoggedIn}
            path="/"
            render={() => <Home />}
          />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
});

export default Application;
