import React from "react";
import { Switch } from "react-router";
import { EnhancedRoute } from "components/shared/auth-route";

const LayoutEntry = React.lazy(() => import("layouts/layout-entry"));

const Application: React.FC = React.memo(() => {
  return (
    <React.Fragment>
      <React.Suspense fallback={"loading"}>
        <Switch>
          <EnhancedRoute
            isLayoutRoute={true}
            path={["/login", "/signup", "/forgot-password"]}
            render={() => <LayoutEntry />}
          />
          <EnhancedRoute path="/" render={() => <div />} />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
});

export default Application;
