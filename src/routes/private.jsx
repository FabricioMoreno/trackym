// routes.js
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import App from "../App";
import Home from "../pages/Home";
import Training from "../pages/Training";
const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Componente padre (opcional)
    // errorElement: <ErrorPage />, // Error global
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Training",
        element: <Training/>,
      },
      {
        path: "*", // Ruta no encontrada (404)
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default privateRouter;