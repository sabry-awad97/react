import { useEffect, useState } from "react";
import Season from "./Season";
import Spinner from "./Spinner";

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setLatitude(position.coords.latitude),
      err => setErrorMessage(err.message)
    );
  }, []);

  const render = () => {
    if (errorMessage && !latitude) {
      return <div>Error: {errorMessage}</div>;
    }

    if (!errorMessage && latitude) {
      return <Season latitude={latitude} />;
    }

    return <Spinner message="Please accept location request" />;
  };

  return <div className="border red">{render()}</div>;
};

export default App;
