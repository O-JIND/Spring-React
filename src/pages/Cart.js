import { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Container, Row, Table, Image, FormCheck } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function App({ user }) {
    const thStyle = { fontSize: '1.2rem' };
    const [cart, setCart] = useState();


    /* useEffect(() => {
            const url = `${API_BASE_URL}/cart/list`;
            axios.get(url)
                 .then((res)=>{
                    setCart=(res.data)
                    })
                 .catch(error){
                 
                 }

                

    }, [])
    */




    return (
        <Container className="my-4">
            <h1>
                <span style={{ color: 'skyblue', fontSize: '2.5rem' }}>{user?.name}'s </span>
                <span style={{ color: 'gray', fontSize: '2rem' }}>Cart List </span>
            </h1>
            <Col >
                <Card>

                    <Table striped bordered>

                        <thead>
                            <tr>
                                <th style={thStyle}>
                                    <FormCheck
                                        type="checkbox"
                                        label="Select All"
                                        onChange={``}
                                    />
                                </th>
                                <th style={thStyle}>Product</th>
                                <th style={thStyle}>Amount</th>
                                <th style={thStyle}>Price</th>
                                <th style={thStyle}>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
                <br />
                <h3 className="text-end mt-3 ">Total Price : 0 ￦</h3>
                <div className="text-end" >
                    <Button
                        variant="primary" size="lg" onClick={``}>
                        Order
                    </Button>
                </div>
            </Col>
        </Container >
    )
}
export default App;