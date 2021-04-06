import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Application from "application";
import reportWebVitals from "./reportWebVitals";
import { AppContext } from "contexts/combine-context";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/common.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext>
        <Application />
      </AppContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
