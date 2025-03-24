import Layout from "./Layout"
import { Route,Routes } from "react-router"
import { Login } from "./Pages/Auth/Login"
import Map from "./Pages/Map/Map"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Layout />}>
          <Route index element={<Map/>} />
          <Route path="map" element={<Map/>} />
        </Route>
      </Routes>
    </>
  )

}

export default App
