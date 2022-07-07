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
      <Changed count={countH} />
      <button onClick={onClickW}>+</button>
      <h1>World+{countW}</h1>
    </>
  );
}

let prev: any;
function _onM(callback: any, value: any) {
  if (value === prev) return;
  callback();
  prev = value;
}

function Changed({ count }: any) {
  let flag = "N";
  _onM(() => {
    flag = "Y";
  }, count);
  return <span>{flag}</span>;
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<Title />);
