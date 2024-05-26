import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import ThemeContextProvider from './contexts/ThemeContextProvider.tsx'
import { BrowserRouter } from "react-router-dom";
import AllRoutes from './shared/AllRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
      
    </ThemeContextProvider>
    
  </React.StrictMode>,
)
