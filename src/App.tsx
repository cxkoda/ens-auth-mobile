import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyRouter from "./routes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyRouter />
      </header>
    </div>
  );
}

export default App;
