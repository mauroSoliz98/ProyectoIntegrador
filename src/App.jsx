import Navbar from "./Components/Navbar"
import { Route,Routes } from "react-router"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </>
  )

}

export default App
