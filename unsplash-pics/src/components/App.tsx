import { FC, useState } from "react";

import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

const App: FC = () => {
  const [images, setImages] = useState([]);

  const onSearchSubmit = async (term: string) => {
    const response = await unsplash.get("/search/photos", {
      params: { query: term },
    });

    setImages(response.data.results);
  };

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <SearchBar onSubmit={onSearchSubmit} />
      <ImageList images={images} />
    </div>
  );
};

export default App;
