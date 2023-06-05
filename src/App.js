import "./App.css";
import ListaUsuarios from "./pages/ListaUsuarios";
import Home from "./pages/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/usuarios" element={<ListaUsuarios />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
