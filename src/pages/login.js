import { useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function App({ setUser }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const LoginAction = async (evt) => {
        evt.preventDefault();
        try {
            const url = `${API_BASE_URL}/member/login`;
            const parameters = { email, password };
            //SpringBoot가 넘겨주는 정보는 Map<String,Object> type
            const response = await axios.post(url, parameters);

            //message에는 로그인 성공 여부를 알려주는 내용, member에는 로그인 한 사람의 객체 정보가 반환
            const { message, member } = response.data;

            if (message === 'success') { //in java map.put('message','success')
                //성공시 정보 저장 성공 후 홈 페이지로 이동
                setUser(member);
                navigate(`/`)

            } else {
                setError(message);
            }

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Failed to login');
            } else {
                setError('Sever Error');
            }
        }
    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <Row className="w-100 justify-content-center">
                    <Col md={6}>
                        <Card>
                            <CardBody>
                                <h2 className="text-center mb-4">Login</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={LoginAction}>
                                    <Form.Group className="email">
                                        <Form.Label>Email</Form.Label>
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
                                            required
                                        />

                                    </Form.Group>
                                    <Row>
                                        <Col xs={8}>
                                            <Button variant="primary" type="submit" className="w-100">
                                                Login
                                            </Button>
                                        </Col>
                                        <Col xs={4}>
                                            <Link to={`/member/signup`} className="btn btn-outline-secondary w-100">
                                                Sign Up
                                            </Link>
                                        </Col>
                                    </Row>


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