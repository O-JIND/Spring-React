import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    return (
        <>
            <Nav.Link  >Product</Nav.Link>
            <NavDropdown title="List ">
                <NavDropdown.Item onClick={() => navigate(`/fruit`)}>
                    ChooseOne
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(`/fruit/list`)}>
                    EntireList
                </NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
export default App;