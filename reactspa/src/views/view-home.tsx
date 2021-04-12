import React from "react";
import { userApiHandlers } from "http/config/api.user";
import { TOTPSetupInfo } from "http/models/TOTPSetupInfo";
import QRCode from "qrcode";
import { Button, Form } from "react-bootstrap";
import _ from "lodash";

interface IState {
  url: string;
  signature: string;
  pin1: string;
  pin2: string;
}

const Home: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    url: "",
    signature: "",
    pin1: "",
    pin2: "",
  });

  const fetchTotpSetupInfo = async () => {
    const res = await userApiHandlers.getTOTPSetupInfo();
    setState({
      url: (res as TOTPSetupInfo).info.totpInfo.TOTPUrl,
      signature: (res as TOTPSetupInfo).info.signature,
      pin1: state.pin1,
      pin2: state.pin2,
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

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      pin1: e.target.value,
    });
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      pin2: e.target.value,
    });
  };

  const handleSubmit = () => {
    userApiHandlers.postTOTPSetup({
      pin1: state.pin1,
      pin2: state.pin2,
      signature: state.signature,
    });
  };
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
      <div style={{ width: 200 }}>
        <Form.Group className="w-full m-b-5">
          <Form.Label className="text-success">Login name</Form.Label>
          <Form.Control
            type="text"
            value={state.pin1}
            onChange={handleChange1}
            name="pin1"
          />
          <Form.Control
            type="text"
            value={state.pin2}
            onChange={handleChange2}
            name="pin2"
          />
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      {state.signature}
    </React.Fragment>
  );
};
export default Home;
