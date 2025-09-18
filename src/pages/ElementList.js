import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { Table } from "react-bootstrap";

//axios 라이브러리를 이용하여 리액트에서 스프링으로 데이터를 요청해야 한다.
function App() {
    const [fruit, setfruit] = useState([]);
    useEffect(() => {
        const url = `${API_BASE_URL}/eleList`;

        axios
            .get(url, {})
            .then((res) => {
                console.log(res.data);
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
                        <th>category</th>
                        <th>stock</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    {fruit.map((Ele) => (
                        <tr key={Ele.id}>
                            <td>{Ele.id}</td>
                            <td>{Ele.name}</td>
                            <td>{Ele.price?.toLocaleString()}</td>
                            <td>{Ele.category}</td>
                            <td>{Ele.stock}</td>
                            <td>{Ele.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
export default App;