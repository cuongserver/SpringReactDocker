import React from "react";
import { userApiHandlers } from "http/config/api.user";
import { TOTPSetupInfo } from "http/models/TOTPSetupInfo";
import QRCode from "qrcode";
import { Button } from "react-bootstrap";
import _ from "lodash";

interface IState {
  url: string;
  signature: string;
}

const Home: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    url: "",
    signature: "",
  });

  const fetchTotpSetupInfo = async () => {
    const res = await userApiHandlers.getTOTPSetupInfo();
    setState({
      url: (res as TOTPSetupInfo).info.totpInfo.TOTPUrl,
      signature: (res as TOTPSetupInfo).info.signature,
    });
  };

  React.useEffect(() => {
    if (_.isEmpty(state.url)) return;
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
      <div>
        <Button variant="outline-info" onClick={fetchTotpSetupInfo}>
          Get QR Code
        </Button>
      </div>
      <canvas id="qrContainer" style={{ height: 300, width: 300 }}>
        {state.url}
      </canvas>
    </React.Fragment>
  );
};
export default Home;
