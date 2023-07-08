import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/home/Welcome';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from './components/users/UserForm';
import UsersList from './components/users/UsersList';
import UserDetails from './components/users/UserDetails';
import CoachesList from './components/coaches/CoachesList';
import Error from './components/utils/Error';

const App = () => {

  return (
    <>
    <Router>
      <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/users" element={<UsersList />} />
          <Route exact path="/users/new" element={<UserForm />} />
          <Route exact path="/users/:id" element={<UserDetails />} />
          <Route exact path="/coaches" element={<CoachesList />} />
          <Route path="*" element={<Error />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
