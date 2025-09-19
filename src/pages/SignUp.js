import axios from "axios";
import { useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    //Form 유효성 검사(Form Validation Check) 관련 state 정의; 입력 양식에 문제 발생시 값을 저장할 곳
    const [error, setError] = useState({
        name: '', email: '', password: '', address: '', general: ''
    });
    const navigate = useNavigate();

    /*
    구분        async/await 사용             then/catch 사용
    필수 여부    없어도 됨                    가능
    가독성       더 깔끔                      체인이 길어지면 복잡
    에러 처리    try...catch 한 번에 가능     .catch() 따로 작성
    추천 여부    대부분의 비동기 코드에서 추천   간단한 한 줄짜리 Promise라면 가능
*/
    const SignupAction = async (evt) => {
        evt.preventDefault();
        try {
            const url = `${API_BASE_URL}/member/signup`;
            const parameters = { name, email, password, address };
            const response = await axios.post(url, parameters);

            if (response.status === 200) {/* Spring MemberController 참조 */
                alert('Success');
                navigate('member/login');
            }

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError((prev) => ({ ...prev, general: 'Error occur in signup' }))
            }
        }
    };
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <Row className="w-100 justify-content-center">
                    <Col md={6}>
                        <Card>
                            <CardBody>
                                <h2 className="text-center mb-4">Sign up</h2>
                                {/*일반 오류 발생시 사용자에게 alert 발생*/}
                                {/*contextual : 상황에 맞는 적절한 스타일 생상을 지정하는 기법*/}
                                {error.general && <Alert variant="danger">{error.general}</Alert>}

                                {/*
                                    !! 연산자는 어떤 값을 강제로 boolean 형태로 변환해주는 기법
                                    isInvalid 속성은 해당 control의 유효성을 검사하는 속성 
                                    값이 true이면 Form.Control.Feedback에 빨간 색상으로 오류메시지를 보여줍니다.
                                    
                                */}

                                <Form onSubmit={SignupAction}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter the name"
                                            value={name}
                                            onChange={(evt) => setName(evt.target.value)}
                                            isInvalid={!!error.name}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {error.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Please enter the email"
                                            value={email}
                                            onChange={(evt) => setEmail(evt.target.value)}
                                            isInvalid={!!error.email}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {error.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Please enter the password"
                                            value={password}
                                            onChange={(evt) => setPassword(evt.target.value)}
                                            isInvalid={!!error.password}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {error.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter the address"
                                            value={address}
                                            onChange={(evt) => setAddress(evt.target.value)}
                                            isInvalid={!!error.address}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {error.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        sign up
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