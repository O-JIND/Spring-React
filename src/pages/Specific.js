import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, Col, Container, Form, FormControl, FormGroup, Image, InputGroup, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

function App({ user }) {
    const { id } = useParams();
    console.log(id);
    const initial_value = {
        id: id, name: '', price: '', category: '', stock: '', description: '', image: '', input_date: ''
    }
    const [product, setProduct] = useState(initial_value);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const [quantity, setQuantity] = useState(1)




    useEffect(() => {
        const url = `${API_BASE_URL}/products/specific/${id}`
        console.log(url);

        axios
            .get(url)
            .then((res) => {
                setProduct(res.data)
                console.log(res.data);
                setLoading(false)
            }).catch((error) => {
                console.log(error);
                navigate(-1);

            });


    }, [id]);

    if (loading === true) {
        return (
            <Container className="my-4 text-center">
                <h3>상품 정보를 읽어 오는 중입니다.</h3>
            </Container>
        )
    }
    if (!product) {
        return (
            <Container className="my-4 text-center">
                <h3>상품 정보를 찾을 수 없습니다.</h3>
            </Container>
        )
    }



    const QuantityChange = (evt) => {
        const newValue = (evt.target.value);
        setQuantity(newValue);
    }

    const addToCart = async () => {
        console.log(user.id);


        if (quantity < 1) {
            return alert(`구매 수량은 1개 이상이어야 합니다.`)
        }

        try {
            const url = `${API_BASE_URL}/cart/insert`;
            const parameters = {
                memberId: user.id,
                productId: product.id,
                quantity: quantity
            };
            const response = await axios.post(url, parameters);
            alert(response.data);
            navigate(`/products`);

        } catch (error) {
            alert(`추가 실패`)
            console.log('Error occur' + error);
        }
    }


    const BuyOne = async () => {
        if (quantity < 1) {
            alert("수량은 한개 이상 선택해야합니다.")
            return;
        }

        try {
            const url = `${API_BASE_URL}/Order`
            const parameter = {
                memberId: user.id,
                status: 'PENDING',
                orderItems: [{
                    productId: product.id,
                    quantity: product.quantity
                }]
            };

            const response = await axios.post(url, parameter)
            console.log(response);
            alert(`${product.name} ${quantity}개 주문하였습니다.`)

            navigate("/products")

        } catch (error) {
            console.log(error);

        }


    }

    return (
        <Container className="my-4">
            <h1>Product specific</h1>
            <Card>
                <Row className="g-4">
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src={`${API_BASE_URL}/images/${product.image}`}
                            alt={`${product.name}`}
                            style={{ width: '100%', height: '400px' }}
                        />

                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <Card.Title className="fd-3" style={{ fontSize: "30px" }}>
                                {product.name}
                            </Card.Title>
                            <Table striped>
                                <tbody>
                                    <tr className="text-center">
                                        <td>
                                            Price
                                        </td>
                                        <td >
                                            {product.price}
                                        </td>
                                    </tr>
                                    <tr className="text-center">
                                        <td>
                                            Category
                                        </td>
                                        <td>
                                            {product.category}
                                        </td>
                                    </tr>
                                    <tr className="text-center">
                                        <td>
                                            Stock
                                        </td>
                                        <td>
                                            {product.stock}
                                        </td>
                                    </tr>

                                    <tr className="text-center">
                                        <td>
                                            Date
                                        </td>
                                        <td>
                                            {product.input_date}
                                        </td>
                                    </tr>
                                    <tr className="text-center">
                                        <td>
                                            Description
                                        </td>
                                        <td>
                                            {product.description}
                                        </td>
                                    </tr>
                                </tbody>


                            </Table>
                            <Form.Group >
                                <Form as={Row} className="mb-3 allign-items-center">
                                    <Col md={2}>
                                        <Form.Label  >구매 수량</Form.Label>
                                    </Col>
                                    <Col md={5}>
                                        <FormControl
                                            type="number"
                                            min="1"
                                            disabled={!user}
                                            value={quantity}
                                            onChange={QuantityChange}

                                        />
                                    </Col>
                                </Form>
                            </Form.Group>
                            <br />
                            <div className="d-flex justify-content-center " >
                                <Button className="me-3 px-4" onClick={() => navigate("/products")} >
                                    Back
                                </Button>

                                <Button className="me-4 px-4"
                                    onClick={() => {
                                        if (!user) {
                                            alert('You should login')
                                            return navigate("/products/Cart")
                                        } else {
                                            addToCart();
                                        }
                                    }
                                    } >
                                    Cart
                                </Button>
                                <Button className="me-2 px-4" onClick={() => {
                                    if (!user) {
                                        alert('You should login')
                                        return navigate("/products")
                                    } else {
                                        BuyOne();
                                    }
                                }
                                } >
                                    Purchase
                                </Button>


                            </div>

                        </CardBody>
                    </Col>
                </Row>
            </Card>
        </Container >
    )
}
export default App;