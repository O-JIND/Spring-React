//routing table props는 요청정보 url props 는 컴포넌트 이름

import { Route, Routes } from "react-router-dom";

import FruitOne from './../pages/FruitOne'
import FruitList from './../pages/FruitList'

function App() {
    return (
        <>
            <Routes>
                <Route path='/fruit' element={<FruitOne />} />
                <Route path='/fruit/list' element={<FruitList />} />

            </Routes>
        </>
    )
}
export default App;