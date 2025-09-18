import { useState } from "react";
import { Button, Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <Row className="w-100 justify-content-center">
                    <Col md={6}>
                        <Card>
                            <CardBody>
                                <h2 className="text-center mb-4"></h2>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter the name"
                                            value={name}
                                            onChange={(evt) => setName(evt.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="email">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Please enter the email"
                                            value={email}
                                            onChange={(evt) => setEmail(evt.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Please enter the password"
                                            value={password}
                                            onChange={(evt) => setPassword(evt.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter the address"
                                            value={address}
                                            onChange={(evt) => setAddress(evt.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="success" >
                                        Sign Up
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default App;