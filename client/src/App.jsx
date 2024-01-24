import MyRoutes from "./MyRoutes";
import { Provider } from "react-redux";
import store from "./reducers/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <MyRoutes />
      </Provider>
    </>
  );
}

export default App;
