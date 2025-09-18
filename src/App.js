
import './App.css';
import Menuitem from './ui/Menuitems.js';
import AppRoutes from './routes/AppRoutes.js'
function App() {
  const appName = "CofeE"
  return (
    <>
      <Menuitem appName={appName} />
      <AppRoutes />
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy;2025{appName}.All rights reserved</p>
      </footer>

    </>
  );
}

export default App;
