import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import coachService from '../../services/coaches.js';
import userService from '../../services/users.js';
import CustomNavbar from '../utils/Navbar';

export default function CoachesList() {
    
    const [coaches, setCoaches] = React.useState([]);
    const [userLog, setUserLog] = React.useState([]);
    const [studentsByCoach, setStudentsByCoach] = React.useState([]);

    React.useEffect(() => {
        const getAllCoaches = async () => {
            const listCoaches = await coachService.allCoaches();
            setCoaches(listCoaches);
        }
        getAllCoaches();

        const getUserLog = async () => {
            const user = await userService.getUserLogeado();
            setUserLog(user);
        }
        getUserLog();
    }, []);



    const handleLogout = () => {
        window.localStorage.removeItem('tokenLoggedUser');
        window.location.href = '/';
    };

    console.log(studentsByCoach)

    return (
        <>
            <div className='text-center'>


                <div className="container" style={{ height: '100vh', width: '100vw' }}>
                    <CustomNavbar action={handleLogout} id={userLog.id} />

                    <div>
                        <h1 className='pb-4'>Lista de coaches</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coaches.map((coach) => (
                                    <tr key={coach.user.id}>
                                        <td> <img src={coach.user.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
                                        <td>{coach.user.name}</td>
                                        <td>{coach.user.lastName}</td>
                                        <td>{coach.user.email}</td>
                                        <td>
                                            <Link to={`/users/${coach.user.id}`}>
                                                <button className="btn btn-primary">Ver</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='pt-4'>
                            <Link to="/users/new">
                                <button className="btn btn-primary">Crear coach</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
