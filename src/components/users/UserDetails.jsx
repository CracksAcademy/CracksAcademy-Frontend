import React from 'react';
import { useParams, Link } from 'react-router-dom';
import userService from '../../services/users.js';
import CustomNavbar from '../utils/Navbar';
import Error from '../utils/Error';
import coachService from '../../services/coaches.js';

export default function UserDetails() {
  const [user, setUser] = React.useState([]);
  const [userLog, setUserLog] = React.useState([]);
  const { id } = useParams();
  const [studentsByCoach, setStudentsByCoach] = React.useState([]);

  React.useEffect(() => {
    const getUser = async () => {
      const users = await userService.allUsers();
      const userExists = users.some((user) => user.id === parseInt(id));
      if (userExists) {
        const user = await userService.getUser(id);
        setUser(user);
        if (user.rolUser === 'COACH') {
          const students = await coachService.studentsByCoach(id);
          setStudentsByCoach(students);
        }
      } else {
        setUser(null);
        window.location.href = '/error';
      }
    };
    getUser();

    const getUserLog = async () => {
      const user = await userService.getUserLogeado();
      setUserLog(user);
    }
    getUserLog();
  }, [id]);

  const handleLogout = () => {
    window.localStorage.removeItem('tokenLoggedUser');
    window.location.href = '/';
  };

  return (
    <>

      {user ? (
        <div className="container" style={{ height: '100vh', width: '100vw' }}>
          <CustomNavbar action={handleLogout} id={userLog.id} />

          <div className="row justify-content-center mx-auto">
            
            <div className="col-sm-6 col-md-4">
            <h1>Detalles del usuario</h1>
              <div className="pt-5" style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={user.avatar} alt="avatar" style={{ width: '200px', height: '200px' }} />
              </div>
              <div className="row justify-content-center text-center pt-4">
                <p>Username: {user.username}</p>
                <p>Nombre: {user.name}</p>
                <p>Apellido: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Rol: {user.rolUser}</p>

                <Link to={`/users/edit/${user.id}`}>
                  <button className="btn btn-primary">Editar</button>
                </Link>
                {user.rolUser === 'COACH' ? (
                  <>
                  <p className='mt-4'>Alumnos: </p>
                  <div className='mp-3 mb-4 d-flex justify-content-between'>
                       {studentsByCoach.map((student) => (
                       <card className="card" style={{ width: '2 rem' }}>
                        <Link to={`/users/${student.user.id}`}>
                          <img src={student.user.avatar} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body">
                          <h5 className="card-title">{student.user.name}</h5>
                          <p className="card-text">{student.user.lastName}</p>
                          <p className="card-text">{student.user.email}</p>
                          <p className="card-text">{student.user.username}</p>
                          <p className="card-text">{student.user.rolUser}</p>
                        </div>
                      </card>
                    ))}
                  </div>
                  </>
                   
                ) : (
                  <>
                  </>
                )}

               
              </div>
            </div>
          </div>
        </div>
      ) : (

        <Error />
      )}

    </>
  );
}