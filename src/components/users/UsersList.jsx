import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import userService from '../../services/users.js';
import CustomNavbar from '../utils/Navbar';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>
                    Nombre{'   '}
                    <button className="btn btn-link p-0" onClick={handleSort}>
                      {sortOrder === 'asc' ? (
                        < BsFillArrowUpCircleFill />
                      ) : (
                        < BsFillArrowDownCircleFill />
                      )}
                    </button>
                  </th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {' '}
                      <img
                        src={user.avatar}
                        alt="avatar"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.rolUser}</td>
                    <td>
                      <Link to={`/users/${user.id}`}>
                        <button className="btn btn-primary">Ver</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className='pt-4'>
              <Link to="/users/new">
                <button className="btn btn-primary">Crear usuario</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
