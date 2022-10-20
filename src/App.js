import logo from "./logo.svg";
import "antd/dist/antd.less";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./component/homePage";

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
