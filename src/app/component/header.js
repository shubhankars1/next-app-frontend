import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const onLogout = () => {
    localStorage.clear();
    swal({
      title: "Success",
      text: 'Logout successfully !',
      icon: "success",
    })
    .then(res => {
      router.push('login');
    });
  }

  return (
    <Navbar bg="warning" expand="lg">
      <Container fluid>
        <Navbar.Brand className='fw-bold bg-danger p-1' href="/">Next App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link href="/" className='nav-link fw-bold'>Home</Link>
            <Link href="/team" className='nav-link fw-bold'>Team</Link>
            <Link href="/about" className='nav-link fw-bold'>About Us</Link>
            <Link href="/contact" className='nav-link fw-bold'>Contact Us</Link>
            <Link href="/blog" className='nav-link fw-bold'>Blog</Link>
            <button type='button' onClick={() => onLogout()} className='nav-link fw-bold'>Logout</button>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <button variant="outline-success">Search</button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}