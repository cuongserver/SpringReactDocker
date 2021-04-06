import React from "react";
import background from "assets/images/4882066.jpg";
import { Switch } from "react-router";
import { EnhancedRoute } from "../components/shared/auth-route";

const ViewLogin = React.lazy(() => import("views/view-login"));
const ViewForgotPassword = React.lazy(
  () => import("views/view-forgotpassword")
);

const LayoutEntry: React.FC = React.memo(() => {
  const style: React.CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <React.Fragment>
      <div className="w-100v h-100v" style={style}>
        <React.Suspense fallback={""}>
          <Switch>
            <EnhancedRoute path={"/login"} render={() => <ViewLogin />} />
            <EnhancedRoute
              path={"/forgot-password"}
              render={() => <ViewForgotPassword />}
            />
          </Switch>
        </React.Suspense>
      </div>
    </React.Fragment>
  );
});

export default LayoutEntry;
