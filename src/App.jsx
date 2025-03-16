import Layout from "./Layout"
import { Route,Routes } from "react-router"
import { Login } from "./Pages/Auth/Login"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Layout />}>
        
        </Route>
      </Routes>
    </>
  )

}

export default App
