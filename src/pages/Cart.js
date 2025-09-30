import { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Container, Row, Table, Image, FormCheck, Form } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function App({ user }) {

    const thStyle = { fontSize: '1.2rem' };
    // 보여주고자 하는 카트 상품 배열 정보 
    const [cart, setCart] = useState([]);
    const [pricetotal, setPriceTotal] = useState(0);
    const navigate = useNavigate();
    // ?. Optional Chaining 물음표를 적어주면 오류가 발생하지 않고 undefined를 반환

    useEffect(() => {
        if (user && user?.id) {
            fetchCartProducts()
        }
    }, [user])

    const fetchCartProducts = async () => {
        try {
            const url = `${API_BASE_URL}/cart/list/${user.id}`;
            const response = await axios.get(url);
            console.log('조회 결과');
            console.log(response.data);
            setCart(response.data || [])


        } catch (error) {
            console.log("!!Error----- : " + error);
            alert("Cart가 존재하지 않습니다.");
            navigate('/products')
        }

    };

    const toggleallCheck = (isAllCheck) => {

        setCart((prev) => {
            // check상태만 true로
            const updatedProducts = prev.map((product) => ({
                ...product,
                checked: isAllCheck
            }));

            refresgOrderTotalPrice(updatedProducts);
            //비동기적 렌더링 문제로 수정된 updatedProduts 항목을 매개 변수로 넘겨야 정상동작

            return updatedProducts;

        });


    }
    // 체크 박스의 상태가 Toggle될 때 마다, 전체 요금을 다시 재계산하는 함수이다.
    const refresgOrderTotalPrice = (products) => {
        let total = 0;
        products.forEach((bean) => {
            if (bean.checked) {
                total += bean.price * bean.quantity
            }
        });
        setPriceTotal(total)
    }

    const Togglecheckbox = (cartProductId) => {
        console.log(cartProductId);
        setCart((prev) => {
            const updatedProducts = prev.map((product) =>
                product.cartProductId === cartProductId ?
                    { ...product, checked: !product.checked } :
                    product

            );
            refresgOrderTotalPrice(updatedProducts);
            return updatedProducts;

        })
    };

    const ChangeQuantity = async (cartProductId, amount) => {

        if (isNaN(amount)) {
            setCart((prev) => {
                const updatedProducts = prev.map((product) =>
                    product.cartProductId === cartProductId ?
                        { ...product, quantity: 0 } :
                        product
                );
                refresgOrderTotalPrice(updatedProducts);
                return updatedProducts;


            })
            alert("At least over 1 char required")
        }


        try {
            const url = `${API_BASE_URL}/cart/edit/${cartProductId}?quantity=${amount}`
            //patch 동작은 전체가 아닌 일부 데이터를 변경하고자 할때 사용된다.
            const response = await axios.patch(url)

        } catch (error) {
            console.log("error :" + error);

        }
        setCart((prev) => {
            const updatedProducts = prev.map((product) =>
                product.cartProductId === cartProductId ?
                    { ...product, quantity: amount } :
                    product
            );
            refresgOrderTotalPrice(updatedProducts);
            return updatedProducts;

        })
    };

    const DelteCartProduct = async (cartProductId) => {
        {

            const confirm = window.confirm("Delete from Cart?")
            if (confirm) {
                try {
                    await axios.delete(`${API_BASE_URL}/cart/delete/${cartProductId}`)
                    navigate('/Cart')
                    alert(`Remove Success`)
                    setCart((prev) => {
                        const updatedProducts = prev.filter((p => p.cartProductId !== cartProductId))//reRendering
                        refresgOrderTotalPrice(updatedProducts)
                        return updatedProducts;
                    })

                } catch (error) {
                    console.log(error);
                }
            } else {
                alert("Cancel");

            }
        }
    }

    const OrderCartProduct = async () => {
        const filtereddata = cart.filter((prev) =>
            prev.checked == true
        );
        if (filtereddata.length === 0) {
            alert("Select order product")
            return;
        }

        // Spring boot 의 orderDto, orderproductDto 클래스와 연관이 있음
        // 주의 > paraeters 작성시 ket의 이름은 Order
        try {
            const url = `${API_BASE_URL}/Order`
            const parameter = {
                memberId: user.id,
                status: 'PENDING',
                orderItems: filtereddata.map((product) => ({
                    cartProductId: product.cartProductId,
                    productId: product.productId,
                    quantity: product.quantity
                }))
            };

            const response = await axios.post(url, parameter)
            console.log(response);

            //주문 한내역 삭제 및 총 금액 초기화 
            setCart((prev) =>
                prev.filter((product) => !product.checked)
            );
            setPriceTotal(0);
            // navigate("/Orders")

        } catch (error) {
            console.log(error);

        }
    };

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
                                        style={{ transform: "scale{1.4}", cursor: "pointer" }}
                                        onChange={(evt) => toggleallCheck(evt.target.checked)}
                                    />
                                </th>
                                <th style={thStyle}>Product</th>
                                <th style={thStyle}>Amount</th>
                                <th style={thStyle}>Price</th>
                                <th style={thStyle}>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cart.length > 0 ?
                                (
                                    cart.map((item) =>
                                        <tr className="text-center align-middle" key={item.cartProductId} >
                                            <td>
                                                <FormCheck
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    style={{ transform: "scale{1.5}", cursor: "pointer" }}
                                                    onChange={() => Togglecheckbox(item.cartProductId)}
                                                />
                                            </td>
                                            <td>
                                                <Row>
                                                    <Col xs={4} >
                                                        <img alt={item.name}
                                                            thumbnail="true"
                                                            width={"80"}
                                                            height={"80"}
                                                            src={`${API_BASE_URL}/images/${item.image}`}
                                                        />
                                                    </Col>
                                                    <Col xs={8} className="d-flex align-items-center">
                                                        {item.name}
                                                    </Col>
                                                </Row>


                                            </td>
                                            <td >
                                                <Form.Control
                                                    value={item.quantity}
                                                    type="number"
                                                    min={1}
                                                    onChange={(evt) =>
                                                        ChangeQuantity(item.cartProductId, parseInt(evt.target.value))}
                                                    style={{ width: '80px', height: '40px', margin: '0 auto' }}
                                                /></td>
                                            <td> {(item.price * item.quantity).toLocaleString()} ￦ </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => DelteCartProduct(item.cartProductId)}
                                                >
                                                    Del
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={5} >
                                            장바구니가 비어있습니다.
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </Table>
                </Card>
                <br />
                <h3 className="text-end mt-3 ">Total Price : {pricetotal.toLocaleString()} ￦</h3>
                <div className="text-end" >
                    <Button
                        variant="primary" size="lg" onClick={OrderCartProduct}>
                        {/* 
                            1. Cart 문으로 props 전송 
                            2. Repo및 Con/Ser 생성 
                            3. Spring 에 DTO 생성 후 Repo에 저장 
                            4. 저장 후 Order 페이지로 이동 후 Repo 값 불러오기
                            




                             */}
                        Order
                    </Button>
                </div>
            </Col>
        </Container >
    )
}
export default App;