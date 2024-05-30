import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar expand="lg" style={{backgroundColor : '#3296FF'}}>
      <Container>
        <Navbar.Brand href="/">ProjectoFinalIO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Categorias">Categoria</Nav.Link>
            <Nav.Link href="#home">Venta</Nav.Link>
            <Nav.Link href="#home">Cliente</Nav.Link>
            <Nav.Link href="#home">Orden de Compra</Nav.Link>
            <Nav.Link href="#home">Proveedor</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;