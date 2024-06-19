import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import ThemeContextProvider from "./contexts/ThemeContextProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./components/shared/AllRoutes.tsx";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import ConversationContextProvider from "./contexts/ConversationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
          <AuthContextProvider>
            <ConversationContextProvider>
              <AllRoutes />
              <Toaster position="top-right" reverseOrder={false} />
            </ConversationContextProvider>
          </AuthContextProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  </React.StrictMode>
);
