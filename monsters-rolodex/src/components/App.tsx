import { useState } from "react";

import CardList from "./CardList";
import SearchBox from "./SearchBox";

import type { Monster } from "../typings/Monster";

import "./App.css";
import { Fetch } from "./Fetch";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [searchField, setSearchField] = useState("");

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox
        placeholder="Search Monsters"
        handleChange={e => setSearchField(e.target.value)}
      />
      <Fetch
        url="https://jsonplaceholder.typicode.com/users"
        loadingFallback={<h1>loading...</h1>}
        onError={error => <h1>Something went wrong... {error.message}</h1>}
        onSuccess={(data: Monster[]) => (
          <CardList
            monsters={data.filter(monster =>
              monster.name.toLowerCase().includes(searchField.toLowerCase())
            )}
          />
        )}
      />
    </div>
  );
};

export default App;
