import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App({ appName }) {
    const navigate = useNavigate();

    return (
        <><Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href='/'>{appName}</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link  >Product</Nav.Link>
                    <NavDropdown title="List ">
                        <NavDropdown.Item onClick={() => navigate(`/fruit`)}>
                            ChooseOne
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate(`/fruit/list`)}>
                            EntireList
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate(`/eleList`)}>
                            Menu EntireList
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate(`/eleList/randm`)}>
                            RandomOne
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={() => navigate(`/member/signup`)} >Sign_up</Nav.Link>

                </Nav>
            </Container>
        </Navbar>

        </>
    )
}
export default App;