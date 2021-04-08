import React from "react";
import { IdentityContext } from "../contexts/identity-context";
import { userApiHandlers } from "../http/config/api.user";
import { TOTPSetupInfo } from "../http/models/TOTPSetupInfo";
import QRCode from "qrcode";

interface IState {
  url: string;
  signature: string;
}
const Home: React.FC = () => {
  const ctx = React.useContext(IdentityContext)!;
  const [state, setState] = React.useState<IState>({
    url: "",
    signature: "",
  });
  React.useEffect(() => {
    userApiHandlers.getTOTPSetupInfo({ Authorization: ctx.jwt }).then((res) => {
      setState({
        url: (res as TOTPSetupInfo).info.totpInfo.TOTPUrl,
        signature: (res as TOTPSetupInfo).info.signature,
      });
    });
  }, []);

  React.useEffect(() => {
    QRCode.toCanvas(
      document.getElementById("qrContainer"),
      state.url,
      (error) => {
        if (error) console.error(error);
      }
    );
  }, [state]);
  return (
    <React.Fragment>
      <div>{ctx.jwt}</div>
      <div>{state.url}</div>
      <canvas id="qrContainer" style={{ height: 300, width: 300 }}>
        {state.url}
      </canvas>
    </React.Fragment>
  );
};
export default React.memo(Home);
