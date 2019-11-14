import React, { useEffect } from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";
import store from "./Store";
import { loadUser } from "./actions/AuthActions";

function App() {
  // load user when app mounts
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <AppNavbar />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
