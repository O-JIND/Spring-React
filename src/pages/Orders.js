import { Card, Col, Container, Nav, Navbar, NavDropdown, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import axios from "axios";

function App({ user }) {

    const [order, setOrder] = useState([]);
    const [orderlist, setOrderlist] = useState({});
    useEffect(() => {


        if (user && user.id) {
            const url = `${API_BASE_URL}/Order/list/${user?.id}`

            axios
                .get(url, {})
                .then((res) => {
                    setOrder(res.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);
    console.log(order);

    const OrderList = () => {
        order.forEach((item) => {
            if (!orderlist.has(item.memberId)) {
                orderlist.add(item.memberId)
            }
        });

        return (
            <Row>
                <Card>


                </Card>
            </Row>
        )



    }


    return (
        <Container>
            <h1>{user?.name}'s OrderList</h1>

            {OrderList}


        </Container>
    )
}
export default App;