import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import studentService from '../../services/students.js';
import userService from '../../services/users.js';
import CustomNavbar from '../utils/Navbar';

export default function StudentsList() {
    
    const [students, setStudents] = React.useState([]);
    const [userLog, setUserLog] = React.useState([]);

    React.useEffect(() => {
        const getAllStudents = async () => {
            const list = await studentService.allStudents();
            setStudents(list);
        }
        getAllStudents();

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

    return (
        <>
            <div className='text-center'>


                <div className="container" style={{ height: '100vh', width: '100vw' }}>
                    <CustomNavbar action={handleLogout} id={userLog.id} />

                    <div>
                        <h1 className='pb-4'>Lista de alumnos</h1>
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
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td> <img src={student.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>
                                        <td>{student.name}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.email}</td>
                                        <td>
                                            <Link to={`/users/${student.id}`}>
                                                <button className="btn btn-primary">Ver</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='pt-4'>
                            <Link to="/users/new">
                                <button className="btn btn-primary">Crear student</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
