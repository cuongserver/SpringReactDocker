import React from "react";
import logo from "logo.svg";
import "./App.css";
import { Context1 } from "context/context1";
import { Context2 } from "context/context2";

function App() {
  const ctx1 = React.useContext(Context1)!;
  const ctx2 = React.useContext(Context2)!;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Ctx1: {ctx1.value}</p>
        <p>Ctx2: {ctx2.value}</p>
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
