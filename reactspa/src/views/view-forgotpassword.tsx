import React from "react";
import { Link } from "react-router-dom";

const ViewForgotPassword: React.FC = () => {
  return (
    <React.Fragment>
      <button>ForgotPassword</button>
      <Link to="/login">Go to login</Link>
    </React.Fragment>
  );
};
export default ViewForgotPassword;
