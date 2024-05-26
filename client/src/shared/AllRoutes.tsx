import { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import App from "../App"

const AllRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:chatId" element={<App />} />
        <Route path="/auth" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default AllRoutes