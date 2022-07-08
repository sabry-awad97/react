import React from "react";
import "./search-box.css";

interface SearchBoxProps {
  placeholder: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, handleChange }) => {
  return (
    <input
      className="search"
      type="search"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
