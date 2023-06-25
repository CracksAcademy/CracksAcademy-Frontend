import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from './components/UserForm';

const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={< Welcome />} />
        <Route exact path="/users/new" element={<UserForm />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
