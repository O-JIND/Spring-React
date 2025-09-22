
import './App.css';
import Menuitem from './ui/Menuitems.js';
import AppRoutes from './routes/AppRoutes.js'
import { useEffect, useState } from 'react';
function App() {
  const appName = "CofeE"

  //user : login user inform state
  //클라이언트에서 사용자 정보를 저장하기 위해서 localStroage를 사용
  //JSON.parse 는 JSON을 자바스크립트 형태로 변환
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loginUser = localStorage.getItem('user');
    setUser(JSON.parse(loginUser));
  }, [user]);//1번만 렌더링

  const handelLoginSuccess = (userData) => {
    //login.js에서 반환 받은 정보
    setUser(userData);
    localStorage.setItem(user, JSON.stringify(userData));
    console.log('success');
  }

  const handelLogoutSuccess = () => {
    setUser(null);
  }

  return (
    <>
      <Menuitem appName={appName} user={user} />
      <AppRoutes user={user} handelLoginSuccess={handelLoginSuccess} logout={handelLogoutSuccess} />
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy;2025{appName}.All rights reserved</p>
      </footer>

    </>
  );
}

export default App;
