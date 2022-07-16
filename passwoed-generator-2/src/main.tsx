import { useState, ChangeEvent, useRef } from "react";
import ReactDOM from "react-dom/client";

import { generatePassword } from "./password";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState("10");
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  return (
    <form id="passwordGeneratorForm" onSubmit={e => {
      e.preventDefault();
      const password = generatePassword(
          +length,
          includeUppercase,
          includeNumbers,
          includeSymbols
      );
      setPassword(password);
    }}>
      <div className="container">
          <h2>Password Generator</h2>
          <div className="result__container">
              <span id="result">{password}</span>
              <button id="copy" onClick={async () => {
                await navigator.clipboard.writeText(password);
              }}>Copy</button>
          </div>
          <div className="options">
              <div className="option">
                  <label>Length</label>
                  <input
                    type="number"
                    id="length"
                    min="4"
                    max="20"
                    value={length}
                    onChange={e => setLength(e.target.value)}
                  />
              </div>
              <div className="option">
                  <label>Include Uppercase</label>
                  <input 
                    type="checkbox" 
                    id="uppercase" 
                    checked={includeUppercase} 
                    onChange={() => setIncludeUppercase(current => !current)} 
                  />
              </div>
              <div className="option">
                  <label>Include Numbers</label>
                  <input 
                    type="checkbox" 
                    id="numbers" 
                    checked={includeNumbers} 
                    onChange={() => setIncludeNumbers(current => !current)} 
                  />
              </div>
              <div className="option">
                  <label>Include Symbols</label>
                  <input 
                    type="checkbox" 
                    id="symbols" 
                    checked={includeSymbols} 
                    onChange={() => setIncludeSymbols(current => !current)} 
                  />
              </div>
          </div>
          <button className="btn" id="generate" type="submit">
              Generate Password
          </button>
      </div>
    </form>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);
