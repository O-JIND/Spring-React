
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';

import Menuitem from './ui/Menuitems.js';
import AppRoutes from './routes/AppRoutes.js'
function App() {
  const appName = "CofeE"
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href='/'>{appName}</Navbar.Brand>
          <Nav className='me-auto'>
            <Menuitem />
          </Nav>
        </Container>
      </Navbar>
      <AppRoutes />
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy;2025{appName}.All rights reserved</p>
      </footer>

    </>
  );
}

export default App;
