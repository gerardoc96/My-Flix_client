import React from 'react';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { setSearchTerm } from '../../features/movies/moviesSlice';

export default function NavigationBar() {
  const { token } = useSelector(state => state.auth);
  const searchTerm = useSelector(state => state.movies.searchTerm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isMovieDetailsPage = location.pathname.startsWith('/movies/') && location.pathname.split('/').length === 3;
  const isMoviesListPage = location.pathname === '/movies';

  const handleSearchChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

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

          {/* Search box */}
          {isMoviesListPage && (

            <Form onSubmit={e => e.preventDefault()}>
              <Form.Control
                type='search'
                placeholder='Search movies'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form>
          )}


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

            {isMovieDetailsPage && (
              <Button onClick={() => navigate(-1)}>
                Go Back</Button>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}