// pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <Link to="/">Ir al inicio</Link>
    </div>
  );
};

export default NotFoundPage;