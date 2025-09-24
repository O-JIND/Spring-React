//routing table props는 요청정보 url props 는 컴포넌트 이름

import { Route, Routes } from "react-router-dom";

import Home from './../pages/Home'
import SignUp from './../pages/SignUp'
import Login from './../pages/login'
import FruitOne from './../pages/FruitOne'
import FruitList from './../pages/FruitList'
import ElementList from './../pages/ElementList'
import RandomElementList from './../pages/RandomElementList'
import Products from './../pages/Products'
import ProductsInsert from './../pages/ProductInsert'


function App({ user, handelLoginSuccess }) {
    // user 사용자 정보 객체
    // handelLoginSuccess 로그인 성공시 동작할 액션

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/member/signup' element={<SignUp />} />
                <Route path='/member/login' element={<Login setUser={handelLoginSuccess} />} />
                <Route path='/fruit' element={<FruitOne />} />
                <Route path='/fruit/list' element={<FruitList />} />
                <Route path='/eleList' element={<ElementList />} />
                <Route path='/eleList/randm' element={<RandomElementList />} />


                <Route path='/products' element={<Products user={user} />} />
                <Route path='/products/insert' element={<ProductsInsert user={user} />} />


            </Routes>
        </>
    )
}
export default App;