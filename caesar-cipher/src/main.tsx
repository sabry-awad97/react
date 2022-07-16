import ReactDOM from "react-dom/client";
import { useRef, useState } from "react";
import { runEncryption } from "./encryption";
import useEventListener from "./useEventListener";
import "./App.css";

function App() {
  const [messageField, setMessageField] = useState("");
  const [shiftField, setShiftField] = useState("5");
  const [passesField, setPassesField] = useState("1");
  const [cipher, setCipher] = useState("");

  useEventListener(
    "input",
    () => {
      const shiftBy = parseInt(shiftField, 10);

      const passes = parseInt(passesField, 10);

      let encrypted = messageField;
      for (let i = 0; i < passes; i++) {
        encrypted = runEncryption(encrypted, shiftBy);
      }

      setCipher(encrypted);
    },
    useRef(document)
  );

  return (
    <>
      <h1>Caesar Cipher</h1>
      <div>
        <label>
          Message
          <input
            id="msg"
            value={messageField}
            onChange={e => setMessageField(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Shift
          <input
            type="number"
            min="-36"
            max="36"
            step="1"
            value={shiftField}
            onChange={e => setShiftField(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Number of Passes
          <input
            type="number"
            id="passes"
            min="0"
            max="100"
            name="passes"
            step="1"
            value={passesField}
            onChange={e => setPassesField(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="cipher">Encrypted Message</label>
        <input id="cipher" value={cipher} onChange={() => {}} />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);
