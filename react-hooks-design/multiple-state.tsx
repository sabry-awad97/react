import React from "react";
import ReactDOM from "react-dom/client";

let states: any = {};
function _getM(initialValue: any, key: any) {
  if (states[key] === undefined) {
    states[key] = initialValue;
  }
  return states[key];
}
function _setM(v: any, key: any) {
  states[key] = v;
  root.render(<Title />);
}

function Title() {
  let countH = _getM(0, "h");
  let countW = _getM(0, "w");

  const onClickH = () => {
    countH = countH + 1;
    _setM(countH, "h");
  };

  const onClickW = () => {
    countW = countW + 1;
    _setM(countW, "w");
  };

  return (
    <>
      <button onClick={onClickH}>+</button>
      <h1>Hello+{countH}</h1>
      <button onClick={onClickW}>+</button>
      <h1>World+{countW}</h1>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<Title />);
