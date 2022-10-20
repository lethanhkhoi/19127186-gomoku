import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Game from './component/Game';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
