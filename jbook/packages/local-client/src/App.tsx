import CellList from "./components/cell-list";
import { Provider } from "react-redux";

import { store } from "./state";

function App() {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
}

export default App;
