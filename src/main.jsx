import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import privateRouter from "./routes/private"
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={privateRouter} /> {/* Usa el router aquí */}
  </StrictMode>,
)
