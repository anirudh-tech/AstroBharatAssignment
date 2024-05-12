import { Routes, Route, Navigate } from "react-router-dom"
import AdminLogin from "./pages/AdminLogin"
import AdminHome from "./pages/AdminHome"
import { Toaster } from "react-hot-toast"
import AdminAddAstrologer from "./pages/AdminAddAstrologer"
import AdminEditAstrologer from "./pages/AdminEditAstrologer"

function App() {

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/home/edit-astrologer/:id" element={<AdminEditAstrologer />} />
        <Route path="/add-astrologer" element={<AdminAddAstrologer />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default App
