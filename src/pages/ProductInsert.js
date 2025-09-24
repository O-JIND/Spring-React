import axios from "axios";
import { useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";


/*
file upload is difference with Sign in

step 1 
Make Form
ControlChange
    각 컨트롤에 대한 change event function
    input : name , price, stock, description
    combo : category 
FileSelect Function 
    FileReader Api 사용 Base64로 인코딩 문자열로 변환
    post 로 전송
    input type="file"
SubmitAction function
    Control에 입력된 내용들을 BackEnd로 전송한다
*/
function App() {
    const comment = "Product Register"
    const initial_value = {
        name: '', price: '', category: '', stock: '', image: '', description: ''
    }; //상품 객체 정보

    const [product, setProduct] = useState(initial_value);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const ControlChange = (evt) => {
        evt.preventDefault();
        const { name, value } = evt.target;
        console.log(`control : ${name}, value : ${value} `);
        //전개 연산자 사용 
        setProduct({ ...product, [name]: value });
    }

    const FileSelect = (evt) => {
        const { name, files } = evt.target;
        const file = files[0] //type="file"로 작정한 1번째 항목

        //FileReader: 웹 브라우저에서 제공해주는 내장 객체, 파일 읽기에 사용가능하다.
        const reader = new FileReader;
        //readAsDataURL file 을 문자열 형태(Base64 인코딩)로 반환 
        reader.readAsDataURL(file);
        //onloadend: 읽기 작업이 성공하면 자동으로 동작하는 이벤트 핸들러 함수; Callback function
        reader.onloadend = () => {
            const result = reader.result;
            setProduct({ ...product, [name]: result });
        };
    }

    const SubmitAction = async (evt) => {
        evt.preventDefault();
        try {
            const url = `${API_BASE_URL}/member/register`;
            const parameters = product;
            const config = { headers: { 'Content-Type': 'application/json' } };

            const response = await axios.post(url, parameters, config)
            console.log(response.data);
            alert('Register Success');
            setProduct(initial_value);
            navigate('/products')

        } catch (error) {
            if (error.response) {
                console.log(`error : ${error}`);
                alert('Register failure')
            } else {
                setError('Server Error')
            }

        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6}>
                    <Card onSubmit={SubmitAction} >
                        <CardBody>
                            <h1>{comment}</h1>
                            {error.general && <Alert variant="danger">{error.general}</Alert>}
                            <Form >
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Please enter the name"
                                        name="name"
                                        value={product.name}
                                        onChange={ControlChange}
                                        isInvalid={!!error.name}
                                    >
                                    </Form.Control>

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Please enter the price"
                                        name="price"
                                        value={product.price}
                                        onChange={ControlChange}
                                        isInvalid={!!error.email}
                                    >
                                    </Form.Control>

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        type="text"
                                        name="category"
                                        value={product.category}
                                        onChange={ControlChange}
                                        required
                                    >
                                        {/* JAVA의 Enum 타입은 모두 대문자 사용 */}
                                        <option value="-">-Choose Category</option>
                                        <option value="BREAD">BREAD</option>
                                        <option value="BEVERAGE">BEVERAGE</option>
                                        <option value="CAKE">CAKE</option>

                                    </Form.Select>

                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Please enter the stock"
                                        name="stock"
                                        value={product.stock}
                                        onChange={ControlChange}
                                        isInvalid={!!error.email}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                {/* type ="file" 은 처리 함수를 따로 처리 */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={FileSelect}
                                        isInvalid={!!error.email}
                                    >
                                    </Form.Control>

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Please enter the description"
                                        name="description"
                                        value={product.description}
                                        onChange={ControlChange}
                                        isInvalid={!!error.email}
                                    >
                                    </Form.Control>
                                    <br />
                                    <Button variant="info" type="submit" size="lg">
                                        {comment}
                                    </Button>

                                </Form.Group>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>




            </Row>
        </Container >
    )
}
export default App;