import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import coordinatorService from '../../services/coordinators.js';
import userService from '../../services/users.js';
import CustomNavbar from '../utils/Navbar';
import BasicCard from '../utils/BasicCard.jsx';

export default function CoordinatorsList() {

    const [coordinators, setCoordinators] = React.useState([]);
    const [userLog, setUserLog] = React.useState([]);

    React.useEffect(() => {
        const getAllCoordinators = async () => {
            const listCoordinators = await coordinatorService.allCooordinators();
            setCoordinators(listCoordinators);
        }
        getAllCoordinators();

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
                        <h1 className='pb-4'>Lista de coordinadores</h1>
                        <Row>
                            {coordinators.map((user) => (
                                <Col key={user.id} xs={12} md={4}>
                                    <BasicCard object={user} />
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