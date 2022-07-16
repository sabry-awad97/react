import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

import { getUppercase, getLowercase, getNumber, getSymbol } from "./password-generator";

import "./App.css";

function App() {
  const [password, setPassword] = useState("l823Zs78#Css09@");
  const [length, setLength] = useState("15");
  const [copySuccess, setCopySuccess] = useState("Copy");
  const [isUpper, setIsUpper] = useState(false);
  const [isLower, setIsLower] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);

  const generateX = () => {
    const xs = [];
    if (isUpper) {
        xs.push(getUppercase());
    }

    if (isLower) {
        xs.push(getLowercase());
    }

    if (isNumber) {
        xs.push(getNumber());
    }

    if (isSymbol) {
        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
  };

  const generatePassword = () => {
    let password = "";

    if (isUpper) {
      password += getUppercase();
    }

    if (isLower) {
      password += getLowercase();
    }

    if (isNumber) {
      password += getNumber();
    }

    if (isSymbol) {
      password += getSymbol();
    }

    for (let i = password.length; i < +length; i++) {
      const x = generateX();
      password += x;
    }

    setPassword(password);
    setCopySuccess("Copy");
  };

  return (
    <div className="pw-container">
      <div className="pw-header">
        <div className="pw">
          <span id="pw">{password}</span>
          <button onClick={async () => {
            try {
              await navigator.clipboard.writeText(password);
              setCopySuccess("Copied!");
            } catch {
              setCopySuccess("Failed!");
            }
          }}>{copySuccess}</button>
        </div>
      </div>
      <div className="pw-body">
        <div className="form-control">
          <label htmlFor="length">Password Length</label>
          <input 
            value={length} 
            onChange={e => setLength(e.target.value)}
            id="length"
            type="number" 
            step="1" 
            min="2" 
            max="30" 
          />
        </div>
        <div className="form-control">
          <label htmlFor="upper">Contain Uppercase Letters</label>
          <input checked={isUpper} onChange={e => setIsUpper(current => !current)} id="upper" type="checkbox" />
        </div>
        <div className="form-control">
          <label htmlFor="lower">Contain Lowercase Letters</label>
          <input checked={isLower} onChange={e => setIsLower(current => !current)} id="lower" type="checkbox" />
        </div>
        <div className="form-control">
          <label htmlFor="number">Contain Numbers</label>
          <input checked={isNumber} onChange={e => setIsNumber(current => !current)} id="number" type="checkbox" />
        </div>
        <div className="form-control">
          <label htmlFor="symbol">Contain Symbols</label>
          <input checked={isSymbol} onChange={e => setIsSymbol(current => !current)} id="symbol" type="checkbox" />
        </div>
        <button className="generate" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);
