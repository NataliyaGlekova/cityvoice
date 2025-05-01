import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import RouterProvider from "./router/RouterProvider";
import { store } from "./store";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterProvider />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
