import React, { useState, useEffect, useRef } from "react";
import useEventListener from "../hooks/useEventListener";

interface Props {
  label: string;
  options: any[];
  selected: any;
  onSelectedChange(option: any): void;
}

const Dropdown: React.FC<Props> = ({
  label,
  options,
  selected,
  onSelectedChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEventListener(
    "click",
    event => {
      const target = event.target as Node;
      if (ref.current?.contains(target)) {
        return;
      }
      setOpen(false);
    },
    useRef(document),
    { capture: true }
  );

  const renderedOptions = options.map(option => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <span className="dropdown icon"></span>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
