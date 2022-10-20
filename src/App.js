import logo from './logo.svg';
import "antd/dist/antd.less";
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Game from './component/game';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
