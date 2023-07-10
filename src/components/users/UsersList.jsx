import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import userService from '../../services/users.js';
import CustomNavbar from '../utils/Navbar';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";
import BasicCard from '../utils/BasicCard.jsx';


export default function UsersList() {
  const [users, setUsers] = React.useState([]);
  const [userLog, setUserLog] = React.useState([]);
  const [sortOrder, setSortOrder] = React.useState('asc');

  React.useEffect(() => {
    const getUsers = async () => {
      const users = await userService.allUsers();
      setUsers(users);
    };
    getUsers();

    const getUserLog = async () => {
      const user = await userService.getUserLogeado();
      setUserLog(user);
    };
    getUserLog();

    if (userLog == null) {
      window.localStorage.removeItem('tokenLoggedUser');
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('tokenLoggedUser');
    window.location.href = '/';
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortUsers = (users) => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      // Comparar los nombres de los usuarios para ordenarlos
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedUsers;
  };

  const sortedUsers = sortUsers(users);

  return (
    <>
      <div className='text-center'>
        <div className="container" style={{ height: '100vh', width: '100vw' }}>
          <CustomNavbar action={handleLogout} id={userLog.id} />

          <div>
            <h1 className='pb-4'>Lista de usuarios</h1>
            <button className="btn btn-link p-0" onClick={handleSort}>
              {sortOrder === 'asc' ? (
                <>
                  <p className='btn btn-primary'>Ordenar < BsFillArrowUpCircleFill /> </p>
                </>
              ) : (
                <>
                  <p className='btn btn-primary'>Ordenar < BsFillArrowDownCircleFill /> </p>
                </>
              )}
            </button>
            <Row>
              {sortedUsers.map((user) => (
                <Col key={user.id} xs={12} md={4}>
                  <BasicCard object={user}/>
                </Col>
              ))}
            </Row>
            <div className='pt-4'>
              <Link to="/users/new">
                <Button variant="primary">Crear usuario</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
