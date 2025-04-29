import './App.css'
import { Routes, Route} from "react-router-dom";
import { Outlet } from "react-router-dom";
function App() {

  return (
    <div>
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  );
};

export default App
