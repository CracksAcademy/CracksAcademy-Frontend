import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../resources/logo.png';

export default function CustomNavbar ({action,id, ...props}) {

  const url = "/users/" + id;
  
  return (
    <Navbar className="mb-4" expand="lg">
      <Navbar.Brand href="#"> 
        <img src={logo} alt="Logo" style={{ width: '60px', height: '60px' }} />
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav" className="justify-content-between">
        <Nav className='mx-auto'>
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/users">Usuarios</Nav.Link>
          <Nav.Link href="/formation"><del>Formacion</del></Nav.Link>
          <Nav.Link href="/calendar"><del>Calendario</del></Nav.Link>
          <Nav.Link href="/coordinators">Coordinadores</Nav.Link>
          <Nav.Link href="/coaches">Coaches</Nav.Link>
          <Nav.Link href="/students">Alumnos</Nav.Link>
          <Nav.Link href="/sust"><del>Sustituciones</del></Nav.Link>
          <Nav.Link href="/material"><del>Material</del></Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Mi perfil" id="navbar-dropdown">
            <NavDropdown.Item href={url}>Ver perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={action}>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
