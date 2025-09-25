import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/config";





/*
과거 업로드 했던 이미지 삭제 ;
*/
function App() {
    const { id } = useParams();
    const comment = "Product Modify"
    const initial_value = {
        id: id, name: '', price: '', category: '', stock: '', image: '', description: ''
    }; //상품 객체 정보
    const [product, setProduct] = useState(initial_value);
    const navigate = useNavigate();
    useEffect(() => {
        const url = `${API_BASE_URL}/products/Update/${id}`
        axios
            .get(url)
            .then((res) => {
                setProduct(res.data)
            }).catch((error) => {
                console.log(error);
                alert('Product information loading Failure')
            });

    }, [id])



    const ModifyAction = (evt) => {
        evt.preventDefault();
        const { name, value } = evt.target;
        setProduct({ ...product, [name]: value });
    }

    const SubmitAction = async (evt) => {
        evt.preventDefault();
        if (product.category === "-") {
            alert("Please select the category")
            return;
        }
        try {
            const url = `${API_BASE_URL}/products/Update/${id}`;
            const parameters = product;
            const config = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.put(url, parameters, config);
            console.log(response.data);
            alert("Modify success");
            setProduct(initial_value);
            navigate('/products');




        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.status);
        }

    }
    const ImageEncoder = (evt) => {
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

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6}>
                    <Card onSubmit={SubmitAction}>
                        <CardBody >
                            <h1>{comment}</h1>
                            <Form >
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Please enter the name"
                                        name="name"
                                        value={product.name}
                                        onChange={ModifyAction}
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
                                        onChange={ModifyAction}
                                    >
                                    </Form.Control>

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        type="text"
                                        name="category"
                                        value={product.category}
                                        onChange={ModifyAction}
                                        required
                                    >
                                        {/* JAVA의 Enum 타입은 모두 대문자 사용 */}
                                        <option value="-" >-Choose Category</option>
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
                                        onChange={ModifyAction}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                {/* type ="file" 은 처리 함수를 따로 처리 */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={ImageEncoder}
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
                                        onChange={ModifyAction}
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