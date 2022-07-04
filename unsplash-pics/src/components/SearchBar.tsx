import { FormEventHandler, useState, FC } from "react";

interface Props {
  onSubmit(term: string): void;
}

const SearchBar: FC<Props> = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  const onFormSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    onSubmit(term);
  };

  return (
    <div className="ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>Image Search</label>
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
