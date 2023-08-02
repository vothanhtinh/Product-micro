import RelatedProduct from "./RelatedProduct";
import { store } from "./store/configStore";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RelatedProduct />
    </Provider>
  );
}

export default App;
