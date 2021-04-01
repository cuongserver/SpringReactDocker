import React from "react";
import logo from "logo.svg";
import "./App.css";
import { Context1 } from "contexts/context1";
import { Context2 } from "contexts/context2";
import { Component1 } from "components/Component1";

function App() {
  const ctx1 = React.useContext(Context1)!;
  const ctx2 = React.useContext(Context2)!;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Ctx1: {ctx1.value}</p>
        <p>Ctx2: {ctx2.value}</p>
        <Component1 />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            ctx1.setValue(new Date().getTime().toString());
          }}
        >
          ABC
        </button>
        <button
          onClick={() => {
            ctx2.setValue(new Date().getTime().toString());
          }}
        >
          DEF
        </button>
      </header>
    </div>
  );
}

export default App;
