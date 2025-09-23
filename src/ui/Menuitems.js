import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App({ appName, user, handelLogout }) {
    //user props 를 사용하여 상단에 보이는 pulldown 메뉴응 분기
    const navigate = useNavigate();

    //user 사용으로 분기 처리
    const renderMenu = () => {
        // ?. Javascript의optional chaining 문법 null이면 undefined로 변환 후 오류메세지 반환
        switch (user?.role) {
            case 'ADMIN':
                return (
                    <>
                        <Nav.Link onClick={() => navigate(``)} >Register</Nav.Link>
                        <Nav.Link onClick={handelLogout} >Logout</Nav.Link>

                    </>
                );
            case 'USER':
                return (
                    <>
                        <Nav.Link onClick={() => navigate(``)} >Wishcart</Nav.Link>
                        <Nav.Link onClick={() => navigate(``)} >Orderlist</Nav.Link>
                        <Nav.Link onClick={handelLogout} >Logout</Nav.Link>
                    </>
                );
            default:
                return (
                    <>

                        <Nav.Link onClick={() => navigate(`/member/signup`)} >Sign up</Nav.Link>
                        <Nav.Link onClick={() => navigate(`/member/login`)} >Login</Nav.Link>

                    </>
                );

        }
    }
    return (
        <><Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href='/'>{appName}</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link onClick={() => navigate(`/products`)}>Product</Nav.Link>
                    {/* user에 따른 분기된 메뉴를 rendering */}
                    {renderMenu()}
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


                </Nav>
            </Container>
        </Navbar>

        </>
    )
}
export default App;