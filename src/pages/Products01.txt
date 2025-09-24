import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";



/* step 1 
contents card display function 
don't create field search , paging function 
--> next day, Admin contents card list and paging
*/


function App({ user }) {
    // const Author = false;
    // if (user === 'ADMIN') { Author = true; }




    // Spring에서 넘겨받은 상품 목록
    const [products, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `${API_BASE_URL}/products/list`

        axios
            .get(url, {})
            .then((res) => {
                console.log(res.data);
                setProduct(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <Container className="my-4">
            <h1 className="my-4">Product List</h1>


            {/* Field search Area */}

            {/* Content Area */}
            <Row>
                {products.map((item) => (
                    <Col key={item.id} md={3} >
                        <Card className="h-100" style={{ cursor: 'pointer' }}>
                            <Card.Img
                                variant="top"
                                src={`${API_BASE_URL}/images/${item.image}`}
                                alt={item.name}
                                style={{ width: '100%', height: '200px' }}
                                onClick={() => navigate()}
                            />
                            <Card.Body >
                                <Card.Title>{item.name}({item.id})</Card.Title>
                                <Card.Text>Price : {item.price.toLocaleString()}￦</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>


            {/* Paging Area */}


        </Container>
    )
}
export default App;