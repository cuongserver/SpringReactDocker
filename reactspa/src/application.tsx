import React from "react";
import { Route, Switch } from "react-router";

const LayoutEntry = React.lazy(() => import("layouts/layout-entry"));

const Application: React.FC = React.memo(() => {
  return (
    <React.Fragment>
      <React.Suspense fallback={"loading"}>
        <Switch>
          <Route
            path={["/login", "/signup", "/forgot-password"]}
            render={() => <LayoutEntry />}
          />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
});

export default Application;
