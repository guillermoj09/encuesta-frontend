import { useAuthDispach, useAuthState } from "../context/authContext";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
const Navigation = () => {

    const user = useAuthState();
    const authDispatch = useAuthDispach();

    const logout = () => {
        authDispatch({
            type:'logout'
        })

    }



    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to='/'>Encuesta</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar"></Navbar.Toggle>
                <Navbar.Collapse id='navbar'>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        { user.isAuthenticated ?
                        <NavDropdown title={user.email} id='navbar-dropdown'>
                            <NavDropdown.Item as={Link} to='/user'>Mis encuenstas</NavDropdown.Item>
                            <NavDropdown.Divider></NavDropdown.Divider>
                            <NavDropdown.Item onClick={logout}>Cerrar Sesion</NavDropdown.Item>
                        </NavDropdown> :
                        <>
                            <Nav.Link as={Link} to="/login">Iniciar Sesion</Nav.Link>
                            <Nav.Link as={Link} to="/register">Crear Cuenta</Nav.Link>
                        </> }
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>

    )
}

export default Navigation;