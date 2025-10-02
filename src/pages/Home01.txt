import { Carousel, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";




function App() {
    return (
        <Container className="mt-4">
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/brioche_04_bigsize.png`}
                        alt="brioche"
                    />
                    <Carousel.Caption>
                        <h3>Brioche</h3>
                        <p>브리오슈</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/croissant_03_bigsize.png`}
                        alt="croissant"
                    />
                    <Carousel.Caption>
                        <h3>Croissant</h3>
                        <p>크로아상</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/french_baguette_01_bigsize.png`}
                        alt="french baguette"
                    />
                    <Carousel.Caption>
                        <h3>French Baguette</h3>
                        <p>프렌치 바게트</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/whitewine01_bigsize.png`}
                        alt="whitewine"
                    />
                    <Carousel.Caption>
                        <h3>White Wine</h3>
                        <p>화이트 와인</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/americano01_bigsize.png`}
                        alt="Americano"
                    />
                    <Carousel.Caption>
                        <h3>Americano</h3>
                        <p>아메리카노</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}
export default App;