import React from "react";
import ReactDOM from "react-dom/client";

let m: unknown = undefined;
function _getM<T>(initialValue: T): T {
  if (m === undefined) {
    m = initialValue;
  }
  return m as T;
}

function _setM<T>(value: T) {
  m = value;
  root.render(<Title />);
}

function Title() {
  let count = _getM(0);
  const onClick = () => {
    console.log("clicked", count);
    count = count + 1;
    _setM(count);
  };

  console.log("updated", count);

  return (
    <>
      <button onClick={onClick}>+</button>
      <h1>Hello World+{count}</h1>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<Title />);
