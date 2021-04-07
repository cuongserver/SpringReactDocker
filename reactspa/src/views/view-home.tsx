import React from "react";
import { IdentityContext } from "../contexts/identity-context";
const Home: React.FC = () => {
  const ctx = React.useContext(IdentityContext)!;
  return <div>{ctx.jwt}</div>;
};
export default React.memo(Home);
