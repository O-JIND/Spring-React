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
                        src={`${API_BASE_URL}/images/Mac.jpg`}
                        alt="MacNCheese"
                    />
                    <Carousel.Caption>
                        <h3>MacNCheese</h3>
                        <p>부드러운 치즈 소스로 버무려 만든 요리</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/Ragu.jpg`}
                        alt="RaguPasta"
                    />
                    <Carousel.Caption>
                        <h3>RaguPasta</h3>
                        <p>진한 미트 소스를 곁들인 파스타</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/Steak.jpg`}
                        alt="Steak"
                    />
                    <Carousel.Caption>
                        <h3>Steak</h3>
                        <p>두툼하게 썬 쇠고기의 풍부한 육즙을 즐기는 요리</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/sushi.jpg`}
                        alt="Sushi"
                    />
                    <Carousel.Caption>
                        <h3>Sushi</h3>
                        <p>생선이나 해산물을 얹어 만드는 일본의 요리</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${API_BASE_URL}/images/tequila_sunrise.jpg`}
                        alt="Tequila Sunrise"
                    />
                    <Carousel.Caption>
                        <h3>Tequila Sunrise</h3>
                        <p>일출처럼 아름다운 색을 내는 달콤한 칵테일</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}
export default App;