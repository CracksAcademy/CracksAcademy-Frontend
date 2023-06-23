import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../resources/logo.png';

export default function CustomNavbar ({action, ...props}) {
  return (
    <Navbar className="mb-4" expand="lg">
      <Navbar.Brand href="#"> 
        <img src={logo} alt="Logo" style={{ width: '60px', height: '60px' }} />
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav" className="justify-content-between">
        <Nav className='mx-auto'>
          <Nav.Link href="#">Inicio</Nav.Link>
          <Nav.Link href="#">Acerca de</Nav.Link>
          <Nav.Link href="#">Servicios</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Mi perfil" id="navbar-dropdown" alignRight>
            <NavDropdown.Item href="#">Ver perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={action}>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
