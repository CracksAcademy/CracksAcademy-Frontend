import React from 'react';
import { useParams } from 'react-router-dom';
import userService from '../../services/users.js';
import CustomNavbar from '../utils/Navbar';
import Error from '../utils/Error';
import coachService from '../../services/coaches.js';
import studentService from '../../services/students.js';
import BasicCard from '../utils/BasicCard';

export default function UserDetails() {
  const [user, setUser] = React.useState([]);
  const [userLog, setUserLog] = React.useState([]);
  const { id } = useParams();
  const [studentsByCoach, setStudentsByCoach] = React.useState([]);
  const [coachByStudent, setCoachByStudent] = React.useState([]);

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
        } else if (user.rolUser === 'STUDENT') {
          try {
            const coach = await studentService.coachByStudent(id);
            setCoachByStudent(coach);
          } catch (error) {
            console.log('Error al obtener el coach:', error);
          }
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
              <h1 className='mb-3 pb-3'>Detalles del usuario</h1>
              <BasicCard object={user} />
              <div className='mt-4'>
                {user.rolUser === 'COACH' && (
                  <>
                    <h4 className='text-center mb-3 pb-3'>Sus alumnos:</h4>
                    {studentsByCoach.map((student) => (
                      <BasicCard key={student.id} object={student.user} />
                    ))}
                  </>
                )}

                {user.rolUser === 'STUDENT' && coachByStudent && coachByStudent.user && (
                  <>
                    <h4 className='text-center mb-3 pb-3'>Su coach:</h4>
                    <BasicCard object={coachByStudent.user} />
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