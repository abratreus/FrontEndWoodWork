import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Logo.css';
import './Navbar.css';

export default function NavBar() {
  const location = useLocation();
  const { authenticated, logout } = useContext(AuthContext);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Navbar expand="md" fixed="top" className="shadow-sm p-3 mb-5 bg-white rounded navbar">
      <Container>
        <Navbar.Brand as={Link} to={isAdminPage ? "/admin" : "/"}>
          <Row className="align-items-center m-0 p-0 g-0 mb-0">
            <Col><div className="Logo"></div></Col>
            <Col className="d-none d-md-block"><div className="Logo-text"></div></Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            {isAdminPage ? (
              // Links de Administração
              <>
                <Nav.Link as={NavLink} to="/admin" end>Home</Nav.Link>
                <Nav.Link as={NavLink} to="/admin/produtos">Produtos</Nav.Link>
                <Nav.Link as={NavLink} to="/admin/usuarios">Usuários</Nav.Link>
                <Nav.Link as={Link}    to="/" onClick={logout}>Sair</Nav.Link>
              </>
            ) : (
              // Links Normais
              <>
                <Nav.Link as={NavLink} to="/catalogo">Catálogo</Nav.Link>
                <Nav.Link as={NavLink} to="/home" end>Home</Nav.Link>

                <NavDropdown title="Conta" id="nav-dropdown">
                  {authenticated ? (
                    <>
                      <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/" onClick={logout}>Sair</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item as={Link} to="/">Entrar</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/register">Cadastrar</NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
