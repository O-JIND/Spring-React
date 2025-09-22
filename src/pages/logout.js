import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/config";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        const url = `${API_BASE_URL}/member/logout`;

        axios.post(url)
            .then(() => {

                console.log('logout success')
                navigate('/member/login')
            })
            .catch((error) => {
                console.log('fail to logout')
            });
    }, [])
    return (
        <>
            Menu Item
        </>
    )
}
export default App;