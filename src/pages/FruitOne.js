import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { Table } from "react-bootstrap";

//axios 라이브러리를 이용하여 리액트에서 스프링으로 데이터를 요청해야 한다.
function App() {
    const [fruit, setfruit] = useState({});
    useEffect(() => {
        const url = `${API_BASE_URL}/fruit`;

        axios
            .get(url, {})
            .then((res) => {
                setfruit(res.data)
            });
    }, []);



    return (
        <>
            <Table hover style={{ margin: "5px" }}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {fruit.id}
                        </td>
                        <td>
                            {fruit.name}
                        </td>
                        <td>
                            {Number(fruit.price).toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
export default App;