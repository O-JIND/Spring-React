import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/config";
import { Table } from "react-bootstrap";

function App() {
    const [fruit, setfruit] = useState([]);
    useEffect(() => {
        const url = `${API_BASE_URL}/fruit/list`;

        axios
            .get(url, {})
            .then((res) => {
                setfruit(res.data)
            });
    }, []);
    const FLS = fruit.map((item) => (
        <tr key={item.id}>
            <td >{item.id}</td>
            <td>{item.name}</td>
            <td>{Number(item.price).toLocaleString()}</td>
        </tr>
    ))


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
                    {FLS}
                </tbody>
            </Table>
        </>
    )
}
export default App;