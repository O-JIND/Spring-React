//routing table props는 요청정보 url props 는 컴포넌트 이름

import { Route, Routes } from "react-router-dom";

import Home from './../pages/Home'
import SignUp from './../pages/SignUp'
import FruitOne from './../pages/FruitOne'
import FruitList from './../pages/FruitList'
import ElementList from './../pages/ElementList'
import RandomElementList from './../pages/RandomElementList'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/member/signup' element={<SignUp />} />
                <Route path='/fruit' element={<FruitOne />} />
                <Route path='/fruit/list' element={<FruitList />} />
                <Route path='/eleList' element={<ElementList />} />
                <Route path='/eleList/randm' element={<RandomElementList />} />

            </Routes>
        </>
    )
}
export default App;