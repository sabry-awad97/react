import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

interface Props {
  onFormSubmit(term: string): void;
}

const SearchBar: React.FC<Props> = props => {
  const [term, setTerm] = useState("");

  const onInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    setTerm(event.target.value);
  };

  const onFormSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    props.onFormSubmit(term);
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>Video Search</label>
          <input type="text" value={term} onChange={onInputChange} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
