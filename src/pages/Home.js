import { Carousel, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




function App() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const url = `${API_BASE_URL}/products?filter=bigs`;
        axios
            .get(url)
            .then((res) =>
                setProducts(res.data)
            )
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const detailView = (id) => {
        navigate(`/products/specific/${id}`);
    };
    console.log(products);

    return (
        <Container className="mt-4">
            <Carousel fade>
                {products.map((bean) =>
                    <Carousel.Item key={bean.id}>
                        <img
                            className="d-block w-100"
                            src={`${API_BASE_URL}/images/${bean.image}`}
                            alt={bean.name}
                            style={{ cursor: 'pointer' }}
                            onClick={() => detailView(bean.id)}
                        />
                        <Carousel.Caption>
                            <h3>{bean.name}</h3>
                            <p>{bean.description.length > 10
                                ? bean.description.substring(0, 10) + '...'
                                : bean.description
                            }</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </Container>
    );
}
export default App;