import "./App.css";
import ListaUsuarios from "./pages/ListaUsuarios";
import Home from "./pages/Home";
import Usuario from "./pages/Usuario";
import UsuarioEditar from "./pages/UsuarioEditar";
import UsuarioCrear from "./pages/UsuarioCrear";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/usuarios" element={<ListaUsuarios />} />
        <Route exact path="/usuarios/:id" element={<Usuario />} />
        <Route exact path="/usuarios/editar/:id" element={<UsuarioEditar />} />
        <Route exact path="/usuarios/crear/:id" element={<UsuarioCrear />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
