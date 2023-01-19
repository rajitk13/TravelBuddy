import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../store/auth-context";

function Header() {
  const authCtx = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Travel Buddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/explore">Explore</Nav.Link>
            <Nav.Link href="/request">Request</Nav.Link>
          </Nav>
          <Nav>
            {!authCtx.isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}

            {authCtx.isLoggedIn && (
              <Nav.Link href="/myrequests">My requests</Nav.Link>
            )}
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
