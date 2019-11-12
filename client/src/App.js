import React from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";
import store from "./Store";

function App() {
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
