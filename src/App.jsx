import Dashboard from "./Layout/dashboard"
import { Route,Routes } from "react-router"
import { Login } from "./Pages/Auth/Login"
import Map from "./Pages/Map/Map"
import { AuthLayout } from "./Layout/auth/authLayout"
import { Register } from "./Pages/Auth/Register"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={< AuthLayout/>}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/home" element={<Dashboard />}>
          <Route index element={<Map/>} />
          <Route path="map" element={<Map/>} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  )

}

export default App
