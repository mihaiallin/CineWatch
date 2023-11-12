import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import Watchlist from "./pages/Watchlist";
import { Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </>
  );
}

export default App;