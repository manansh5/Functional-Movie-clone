import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";

const CustomNavbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="px-3">
      <Container>
        <Navbar.Brand as={Link} to="/">MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search movies..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
