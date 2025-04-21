import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function NavigationBar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">

      <Container>

        <Navbar.Brand as={NavLink} to="/movies">
          MyFlix
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          <Nav className="me-auto">
            {token && (
              <>

                <Nav.Link as={NavLink} to="/movies">
                  Movies
                </Nav.Link>

                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>

              </>
            )}
          </Nav>

          <Nav>
            {!token ? (
              <>

                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/signup">
                  Sign Up
                </Nav.Link>

              </>
            ) : (
              <Button onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}