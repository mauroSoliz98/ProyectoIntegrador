import Layout from "./Layout"
import { Route,Routes } from "react-router"
import { Login } from "./Pages/Auth/Login"
import MapView from "./Pages/MapView/MapView"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Layout />}>
          <Route index element={<MapView/>} />
          <Route path="map" element={<MapView/>} />
        </Route>
      </Routes>
    </>
  )

}

export default App
