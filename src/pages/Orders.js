import { Alert, Button, ButtonGroup, Card, CardBody, CardFooter, CardText, CardTitle, Col, Container, Form, Nav, Navbar, NavDropdown, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import axios from "axios";

function App({ user }) {

    const [order, setOrder] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState([true]);
    const navigate = useNavigate();
    const makeAdminButtons = (id, member) => {

        if (user?.role !== "ADMIN") { return null; }
        return (
            <Col >
                <Row>
                    User : {member}
                </Row>
                <Row>

                    <Button
                        style={{ width: "100px", marginRight: "10px" }}
                        size="sm"
                        onClick={() => ModifyOrder(id)}
                    >
                        Mod
                    </Button>



                    <Button
                        style={{ width: "100px" }}
                        size="sm"
                        onClick={() => CancelOrder(id)}
                    >
                        Can
                    </Button>

                </Row >
            </Col >
        )
    }


    useEffect(() => {

        if (!user) {
            setError("로그인이 필요합니다.")
            setLoading(false)
        }
        // SpringBoots's OrderController getOrderList()
        const fetchOrders = async () => {
            try {
                const url = `${API_BASE_URL}/Order/list`;
                const parameter = { params: { memberId: user?.id, role: user?.role } };
                const response = await axios.get(url, parameter);
                setOrder(response.data);

            } catch (error) {
                setError('Loading failed')
                console.log(error);
            } finally {
                setLoading(false)
            }
        };

        fetchOrders();

    }, [user]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">주문 목록을 불러오는 중입니다.</span>
                </Spinner>
            </div>
        );
    }
    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }


    console.log(order);


    const CancelOrder = async (id) => {
        try {
            const url = `${API_BASE_URL}/Order/delete/${id}`
            const response = await axios.delete(url)
            console.log(response);

            alert(response.data)
            setOrder((prev) => prev.filter(pro => pro.orderId !== id));


        } catch (error) {
            console.log(error);

        }
    }

    const ModifyOrder = async (id) => {
        return null;
        // try {
        //     const url = `${API_BASE_URL}/Order/update/${id}`
        //     const response = await axios.delete(url)
        //     alert(response)
        // } catch (error) {
        //     console.log(error);

        // }
    }


    return (
        <Container className="my-4">
            <h1 className="my-4">주문 내역</h1>
            {order.length === 0 ? (
                <Alert variant="secondary">OrderList is not exist </Alert>
            ) : (
                <Row>{
                    order.map((item) =>
                        <Col key={item.orderId} md={4} className="mb-4">
                            <Card className="h-100 shadow-sm ">
                                <CardBody>
                                    <div >
                                        <CardTitle >Order Num : {item.orderId}</CardTitle>

                                        <CardText >
                                            <strong>State : {item.status}</strong>
                                        </CardText>
                                        <small className="text-muted" >Order Date :{item.orderDate}</small>
                                    </div>

                                    <ul >
                                        {item.orderItems.map((product) =>
                                            <li key={`${item.memberId}${item.orderId}`}>
                                                {product.productName}  {product.quantity} 개
                                            </li>
                                        )}
                                    </ul>

                                </CardBody>

                                <CardFooter className="d-flex justify-content-end">
                                    {makeAdminButtons(item.orderId, item.memberId)}

                                </CardFooter>
                            </Card>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    )
}
export default App;