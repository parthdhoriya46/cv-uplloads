import './Components.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeList from './EmployeeList'
import AddEmployee from './AddEmployee'

function App() {

  return (
    <>
           <Router>
        {/* Main Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              Employee Management
            </Navbar.Brand>
          </Container>
        </Navbar>

        {/* Main layout with sidebar and content */}
        <Container fluid className="p-0 full-screen">
          <Row className="no-gutters" style={{ height: '100%' }}>
            {/* Sidebar */}
            <Col xs={2} className="bg-light sidebar p-3 full-height">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/">Employees List</Nav.Link>
                <Nav.Link as={Link} to="/add-employee">Add Employee</Nav.Link>
              </Nav>
            </Col>

            {/* Main content area */}
            <Col xs={10} className="p-4 full-height">
              <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/add-employee" element={<AddEmployee />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  )
}

export default App
